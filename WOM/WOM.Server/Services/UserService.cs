using SQLitePCL;
using WOM.Server.Models;

namespace WOM.Server.Services{

    public class UserService{

        private readonly AppDbContext _context;

        public UserService (AppDbContext context){
            _context = context;
        }

        public void AddUser (User user){
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        public User? GetUser(string username){
            return _context.Users.FirstOrDefault(u => u.Username == username);
        }

        public bool VerifyPassword(string given, string stored){
            return BCrypt.Net.BCrypt.Verify(given, stored);
        }
    }
}