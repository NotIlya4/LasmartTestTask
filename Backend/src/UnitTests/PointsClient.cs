using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Core.Models;
using Newtonsoft.Json.Linq;
using Startup.Controllers;

namespace UnitTests
{
    public class PointsClient
    {
        private readonly HttpClient _client;

        public PointsClient(HttpClient client)
        {
            _client = client;
        }

        public async Task<List<Point>> GetPoints()
        {
            HttpResponseMessage response = await _client.GetAsync("api/points");
            var responseJObject = JArray.Parse(await response.Content.ReadAsStringAsync());
            return responseJObject.ToObject<List<Point>>() ?? throw new InvalidOperationException();
        }
        public async Task RemovePoint(int id)
        {
            await _client.DeleteAsync($"api/points/id/{id.ToString()}");
        }

        public async Task AddPoint(Point point)
        {
            await _client.PostAsync("api/points", JsonContent.Create(point));
        }

        public async Task UpdatePointPosition(UpdatePointPositionRequest request)
        {
            await _client.PostAsync("api/points/position", JsonContent.Create(request));
        }
    }
}