using api.Interfaces;

namespace api.Service
{
    public class AuthenticationService : IAuthenticationService
    {
        private static string _userId;
        private static string _userName;
        public string GetUserName()
        {
            return _userName;
        }

        public string SetUserId(string userId)
        {
            return _userId = userId;
        }

        public string SetUserName(string userName)
        {
            return _userName = userName;
        }

        public string GetUserId()
        {
            return _userId;
        }
    }
}
