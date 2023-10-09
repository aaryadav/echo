import { AIStream, type AIStreamParser, type AIStreamCallbacks } from 'ai';

function parseCustomStream(): AIStreamParser {
  let previous = '';

  return data => {
    const json = JSON.parse(data);

    // const text = json.completion;
    // const delta = text.slice(previous.length);
    // previous = text;

    // return delta;
    const text = json.text;

    return text;
  };
}

export function CustomStream(
  res: Response,
  cb?: AIStreamCallbacks,
): ReadableStream {
  return AIStream(res, parseCustomStream(), cb);
}

// Then you can use AnthropicStream like this:
const fetchResponse = await fetch('/api/anthropic-endpoint');
const anthropicStream = CustomStream(fetchResponse, {
  onStart: async () => {
    console.log('Stream started');
  },
  onCompletion: async completion => {
    console.log('Completion completed', completion);
  },
  onFinal: async completion => {
    console.log('Stream completed', completion);
  },
  onToken: async token => {
    console.log('Token received', token);
  },
});
// Now you can consume the anthropicStream