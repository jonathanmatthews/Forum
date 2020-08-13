using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Datamodel.Infrastructure;
using Datamodel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Server.Infrastructure
{
    public class UserStore : IUserStore<User>, IUserPasswordStore<User>
    {
        private AppDbContext _appContext;

        public UserStore(AppDbContext context)
        {
            _appContext = context;
        }

        public async Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken)
        {
            await _appContext.Users.AddAsync(user);
            await _appContext.SaveChangesAsync();
            return IdentityResult.Success;
        }

        public async Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken)
        {
            var userToRemove = await _appContext.Users
                .FindAsync(user);

            _appContext.Users.Remove(userToRemove);
            await _appContext.SaveChangesAsync();
            return IdentityResult.Success;
        }

        public Task<User> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            return _appContext.Users
                .Where(o => o.Id == userId)
                .FirstOrDefaultAsync();
        }

        public Task<User> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            return _appContext.Users
                .Where(o => o.NormalizedUsername == normalizedUserName)
                .FirstOrDefaultAsync();
        }

        public Task<string> GetNormalizedUserNameAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedUsername);
        }

        public Task<string> GetUserIdAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Id);
        }

        public Task<string> GetUserNameAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username);
        }

        public Task SetNormalizedUserNameAsync(User user, string normalizedName, CancellationToken cancellationToken)
        {
            user.NormalizedUsername = normalizedName;
            return Task.CompletedTask;
        }

        public Task SetUserNameAsync(User user, string userName, CancellationToken cancellationToken)
        {
            user.Username = userName;
            return Task.CompletedTask;
        }

        public Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }

        public Task SetPasswordHashAsync(User user, string passwordHash, CancellationToken cancellationToken)
        {
            user.PasswordHash = passwordHash;
            return Task.CompletedTask;
        }

        public Task<string> GetPasswordHashAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(User user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.PasswordHash != null);
        }

        public void Dispose()
        {
        }
    }
}