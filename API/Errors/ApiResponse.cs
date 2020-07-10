using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public ApiResponse(int statusCode, string message=null)
        {
            StatusCode = statusCode;
            Message = message??GetDeafaultMessageForStatusCode(statusCode);
        }

        private string GetDeafaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400=>"A bad request, you have made",
                401=>"Authorized, You are Not ",
                404=>"Resourse found, It wasn't",
                500=>"Errors lead to anger, Anger leads to hate, Hate lead to Carrer switch, Switch lead to Earn",
                _=>null

            };
        }
    }
}