import axios from '@/services/axiosInstance';
import ChannelService from '@/services/channel.service';

jest.mock('@/services/axiosInstance');

describe('ChannelService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getChannels should return the formatted channel data', async () => {
    const mockResponse = {
      data: [
        { id: 1, nom: 'Channel 1' },
        { id: 2, nom: 'Channel 2' },
      ],
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    const result = await ChannelService.getChannels();

    expect(axios.get).toHaveBeenCalledWith('/channels/1');
    expect(result).toEqual([
      { id: 1, nom: 'Channel 1' },
      { id: 2, nom: 'Channel 2' },
    ]);
  });

  it('getChannelName should return the channel name', async () => {
    const channelId = 1;
    const mockResponse = { data: { nom: 'Channel 1' } };
    axios.get.mockResolvedValueOnce(mockResponse);

    const result = await ChannelService.getChannelName(channelId);

    expect(axios.get).toHaveBeenCalledWith(`/channel/${channelId}`);
    expect(result).toEqual('Channel 1');
  });

  it('addChannel should return the response data when user role is admin', async () => {
    const channelName = 'New Channel';
    const mockResponse = { data: { id: 3, nom: 'New Channel' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await ChannelService.addChannel(channelName);

    expect(axios.post).toHaveBeenCalledWith('/createchannel', {
      nom: channelName,
      typologie: 1,
    });
    expect(result).toEqual({ id: 3, nom: 'New Channel' });
  });

  it('delete should return the response data when user role is admin', async () => {
    const channelId = 1;
    const mockResponse = { data: { message: 'Channel deleted successfully.' } };
    axios.delete.mockResolvedValueOnce(mockResponse);

    const result = await ChannelService.delete(channelId);

    expect(axios.delete).toHaveBeenCalledWith(`/delete/channels/${channelId}`);
    expect(result).toEqual({ message: 'Channel deleted successfully.' });
  });

  it('add a channel should throw an error when user role is not admin', async () => {
    const channelName = 'New Channel';
    const mockErrorResponse = JSON.stringify({
      response: {
        data: {
          message: "Vous devez être administrateur pour pouvoir accéder à cette fonction!",
        },
      },
    });
    axios.post.mockRejectedValueOnce(mockErrorResponse);

    await expect(ChannelService.addChannel(channelName)).rejects.toThrow();
  });

  it('delete a channel should throw an error when user role is not admin', async () => {
    const channelId = 1;
    const mockErrorResponse = JSON.stringify({
      response: {
        data: {
          message: "Vous devez être administrateur pour pouvoir accéder à cette fonction!",
        },
      },
    });
    axios.delete.mockRejectedValueOnce(mockErrorResponse);

    await expect(ChannelService.delete(channelId)).rejects.toThrow();
  });
});
