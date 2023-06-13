import axios from '@/services/axiosInstance';
import UserService from '@/services/user.service';

jest.mock('@/services/axiosInstance');

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return user data for the given id', async () => {
      const mockResponse = {
        data: {
          id: 1,
          username: 'testuser',
          picture: 'profile.jpg',
        },
      };
      axios.get.mockResolvedValueOnce(mockResponse);

      const userId = 1;
      const response = await UserService.getUserById(userId);

      expect(axios.get).toHaveBeenCalledWith(`/user/${userId}`);
      expect(response).toBe(mockResponse.data);
    });
  });

  describe('getUsers', () => {
    it('should return an array of formatted user data', async () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            username: 'user1',
            picture: 'profile1.jpg',
          },
          {
            id: 2,
            username: 'user2',
            picture: 'profile2.jpg',
          },
        ],
      };
      axios.get.mockResolvedValueOnce(mockResponse);

      const response = await UserService.getUsers();

      expect(axios.get).toHaveBeenCalledWith('/users');
      expect(response).toEqual([
        {
          id: 1,
          username: 'user1',
          picture: 'profile1.jpg',
        },
        {
          id: 2,
          username: 'user2',
          picture: 'profile2.jpg',
        },
      ]);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile and return success message', async () => {
      const userId = 1;
      const user = {
        username: 'newusername',
        password: 'newpassword',
        email: 'newemail@example.com',
      };
      const mockResponse = {
        data: {
          message: 'Profile updated successfully',
        },
      };
      axios.put.mockResolvedValueOnce(mockResponse);

      const response = await UserService.updateProfile(userId, user);

      expect(axios.put).toHaveBeenCalledWith(`/update/users/${userId}`, {
        username: 'newusername',
        password: 'newpassword',
        email: 'newemail@example.com',
      });
      expect(response).toBe('Profile updated successfully');
    });

    it('should throw an error message if update fails', async () => {
      const userId = 1;
      const user = {
        username: 'newusername',
        password: 'newpassword',
        email: 'newemail@example.com',
      };
      const mockErrorResponse = JSON.stringify({
        response: {
          data: {
            message: 'Update failed',
          },
        },
      });
      axios.put.mockRejectedValueOnce(mockErrorResponse);

      await expect(UserService.updateProfile(userId, user)).rejects.toThrow();
    });
  });
});
