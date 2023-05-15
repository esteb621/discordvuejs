import axios from '@/services/axiosInstance';
import MessageService from '@/services/message.service';

jest.mock('@/services/axiosInstance');

describe('MessageService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendMessage', () => {
    it('should send a message and return the response', async () => {
      const idUser = 1;
      const idChannel = 1;
      const message = 'Hello, world!';
      const mockResponse = {
        data: {
          id: 1,
          user_id: idUser,
          channel_id: idChannel,
          text: message,
        },
      };
      axios.post.mockResolvedValueOnce(mockResponse);

      const response = await MessageService.sendMessage(idUser, idChannel, message);

      expect(axios.post).toHaveBeenCalledWith('/createMessage', {
        user_id: idUser,
        channel_id: idChannel,
        text: message,
      });
      expect(response).toBe();
    });

    it('should log an error if sending a message fails', async () => {
      const idUser = 1;
      const idChannel = 1;
      const message = 'Hello, world!';
      const mockErrorResponse = JSON.stringify({
        response: {
          data: 'Error sending message',
        },
      });
      axios.post.mockRejectedValueOnce(mockErrorResponse);

      console.warn = jest.fn(); // Mock console.warn

      await MessageService.sendMessage(idUser, idChannel, message);

      expect(axios.post).toHaveBeenCalledWith('/createMessage', {
        user_id: idUser,
        channel_id: idChannel,
        text: message,
      });
      expect(console.warn).toHaveBeenCalledWith(mockErrorResponse);
    });
  });

  describe('getMessages', () => {
    it('should return an array of formatted messages for the given channel id', async () => {
      const idChannel = 1;
      const mockResponse = {
        data: [
          {
            id: 1,
            channel_id: idChannel,
            user_id: 1,
            text: 'Hello',
          },
          {
            id: 2,
            channel_id: idChannel,
            user_id: 2,
            text: 'World',
          },
        ],
      };
      axios.get.mockResolvedValueOnce(mockResponse);

      const response = await MessageService.getMessages(idChannel);

      expect(axios.get).toHaveBeenCalledWith(`/messages/channel/${idChannel}`);
      expect(response).toEqual([
        {
          id: 1,
          channel: idChannel,
          user: 1,
          text: 'Hello',
        },
        {
          id: 2,
          channel: idChannel,
          user: 2,
          text: 'World',
        },
      ]);
    });
  });
});
