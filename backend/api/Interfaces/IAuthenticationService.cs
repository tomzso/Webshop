namespace api.Interfaces
{
    public interface IAuthenticationService
    {
        public string GetUserName();
        public string GetUserId();
        public string SetUserName(string userName);
        public string SetUserId(string userId);
    }
}