using EmployeeApi.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.Json;

namespace EmployeeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AiAssistantController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;

        public AiAssistantController(
            EmployeeDbContext context,
            IConfiguration configuration,
            IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("ask")]
        public async Task<IActionResult> Ask([FromBody] AiQuestionRequest request)
        {
            var aiEnabled = _configuration.GetValue<bool>("AISettings:EnableAiAssistant");

            if (!aiEnabled)
            {
                return Ok(new
                {
                    answer = "AI Assistant is currently disabled."
                });
            }

            var totalEmployees = await _context.Employees.CountAsync();

            var employeesByCity = await _context.Employees
                .GroupBy(e => e.city)
                .Select(g => new
                {
                    City = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            var employeesByRole = await _context.Employees
                .GroupBy(e => e.role)
                .Select(g => new
                {
                    Role = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            var employeeData = new
            {
                TotalEmployees = totalEmployees,
                EmployeesByCity = employeesByCity,
                EmployeesByRole = employeesByRole
            };

            var endpoint = _configuration["AzureOpenAI:Endpoint"];
            var apiKey = _configuration["AzureOpenAI:ApiKey"];
            var deploymentName = _configuration["AzureOpenAI:DeploymentName"];

            var url = $"{endpoint}/openai/v1/chat/completions";
            if (string.IsNullOrWhiteSpace(endpoint) ||
    string.IsNullOrWhiteSpace(apiKey) ||
    string.IsNullOrWhiteSpace(deploymentName))
            {
                return BadRequest("Azure OpenAI configuration is missing.");
            }
            var payload = new
            {
                model = deploymentName,
                messages = new[]
                {
                    new
                    {
                        role = "system",
                        content = "You are an HR assistant for an Employee Management System. Answer only using the employee data provided. Do not guess."
                    },
                    new
                    {
                        role = "user",
                        content = $"""
                        Employee data:
                        {JsonSerializer.Serialize(employeeData)}

                        User question:
                        {request.Question}
                        """
                    }
                },
                temperature = 0.2,
                max_tokens = 300
            };

            var client = _httpClientFactory.CreateClient();

            var httpRequest = new HttpRequestMessage(HttpMethod.Post, url);
            httpRequest.Headers.Add("api-key", apiKey);
            httpRequest.Content = new StringContent(
                JsonSerializer.Serialize(payload),
                Encoding.UTF8,
                "application/json");

            var response = await client.SendAsync(httpRequest);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, responseContent);
            }

            using var jsonDoc = JsonDocument.Parse(responseContent);

            var answer = jsonDoc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return Ok(new { answer });
        }
    }
}