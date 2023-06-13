import axios from '@/services/axiosInstance';
import AuthService from '@/services/auth.service';
import TokenService from '@/services/token.service';

jest.mock('@/services/axiosInstance');
jest.mock('@/services/token.service')

  describe('AuthService', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

  describe('login', () => {
    it('should set user token and return response data if successful', async () => {
      const user = {
        username: 'testuser',
        password: 'testpassword',
      };
      const mockResponse = {
        data: {
          userId:1,
          accessToken: 'mockAccessToken',
          refreshToken: 'mockRefreshToken',
        },
      };
      axios.post.mockResolvedValueOnce(mockResponse);

      const response = await AuthService.login(user);

      expect(axios.post).toHaveBeenCalledWith('../auth/login', {
        username: 'testuser',
        password: 'testpassword',
      });
      expect(TokenService.setUser).toHaveBeenCalledWith(mockResponse.data);
      expect(response).toBe(mockResponse.data);
    });

    it('should return error message if login fails', async () => {
      const user = {
        username: 'testuser',
        password: 'testpassword',
      };
      const mockErrorResponse = {
        response: {
          data: {
            message: 'Login failed',
          },
        },
      };
      axios.post.mockRejectedValueOnce(mockErrorResponse);

      const response = await AuthService.login(user);

      expect(axios.post).toHaveBeenCalledWith('../auth/login', {
        username: 'testuser',
        password: 'testpassword',
      });
      expect(TokenService.setUser).not.toHaveBeenCalled();
      expect(response).toBe('Login failed');
    });
  });

  describe('register', () => {
    it('should set user token and return response data if successful', async () => {
      const user = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
        profilePicture: new File([], 'profile.jpg'),
      };
      const mockResponse = {
        data: {
          accessToken: 'mockAccessToken',
          refreshToken: 'mockRefreshToken',
        },
      };
      axios.post.mockResolvedValueOnce(mockResponse);

      const response = await AuthService.register(user);

      expect(axios.post).toHaveBeenCalledWith('../auth/register', expect.any(FormData), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      expect(TokenService.setUser).toHaveBeenCalledWith(mockResponse.data);
      expect(response).toBe(mockResponse.data);
    });

    it('should return error message if registration fails', async () => {
      const user = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
        profilePicture: new File([], 'profile.jpg'),
      };
      const mockErrorResponse = {
        response: {
          data: {
            message: 'Registration failed',
          },
        },
      };
      axios.post.mockRejectedValueOnce(mockErrorResponse);

      const response = await AuthService.register(user);

      expect(axios.post).toHaveBeenCalledWith('../auth/register', expect.any(FormData), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      expect(TokenService.setUser).not.toHaveBeenCalled();
      expect(response).toBe('Registration failed');
    });
  });

  describe('logout', () => {
    it('should remove user from TokenService', () => {
      AuthService.logout();

      expect(TokenService.removeUser).toHaveBeenCalled();
    });
  });
});