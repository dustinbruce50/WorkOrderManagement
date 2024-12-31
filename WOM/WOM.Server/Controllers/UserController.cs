using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WOM.Server.Models;
using WOM.Server.Services;

namespace WOM.Server.Controllers{

    [ApiController]
    [Route("api/[controller]")]
    public class UsersController: ControllerBase{
        private readonly UserService _userService;

        public UsersController(UserService userService){
            _userService = userService;
        }

        [HttpOptions]
        [Route("login")]
        public IActionResult LoginOptions(){
            Response.Headers.Append("Access-Control-Allow-Origin", "https://localhost:3000");
            Response.Headers.Append("Access-Control-Allow-Methods", "POST, OPTIONS"); 
            Response.Headers.Append("Access-Control-Allow-Headers", "Content-Type");
            return Ok();
        }

        [HttpPost("register")]
        public IActionResult Register (User user){

            
            try{
                if(user.Username == null ){
                    return BadRequest();
                }
                var existingUser = _userService.GetUser(user.Username);
                if(existingUser != null){
                    return BadRequest("An account already exists with that username");
                }
                else if (!emailValid(user.Username)){
                    return BadRequest("Please enter a valid email address");
                }
                _userService.AddUser(user);
                return Ok();
            }
            catch(Exception e){
                Console.WriteLine($"Error: {e}");
                return StatusCode(200, "Something deeply personal went wrong");
            }
        }

        
            
            
        

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginDetails){

            if(string.IsNullOrEmpty(loginDetails.Username)){
                return BadRequest("Username cannot be null or empty");
            }
            var user = _userService.GetUser(loginDetails.Username);
            if (user == null){
                return Unauthorized("Username is null");
            }
            else if( 
                (loginDetails.Password != null) && 
                (user.Password != null) &&
                !_userService.VerifyPassword(loginDetails.Password, user.Password))
                {
                return Unauthorized("Incorrect Password");
                }

            if(
                (loginDetails.Password != null) &&
                (user.Password != null) &&
                loginDetails.Username == user.Username &&
                _userService.VerifyPassword(loginDetails.Password, user.Password))
            
            {
                HttpContext.Session.SetString("Username", user.Username);
                Console.WriteLine($"Context changed ");
                return Ok();
            }
            else {
                return Unauthorized("Deep inside if flow");
            }
        }
        /*
        public IActionResult Dashboard(){
            var username = HttpContext.Session.GetString("Username");
            if (string.IsNullOrEmpty(username)){
                return RedirectToAction("Login");
            }
            return View();
        }
        */
        private bool emailValid(string email){
                if(string.IsNullOrEmpty(email)){
                    return false;
                }
                try{
                    var emailPatterern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
                    return Regex.IsMatch(email, emailPatterern, RegexOptions.IgnoreCase);
                }
                catch (RegexMatchTimeoutException){
                    return false;
                }
            }

    }

}
