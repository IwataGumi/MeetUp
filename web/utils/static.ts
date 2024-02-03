export const videoConstraints = {
  audio: true,
  video: {
    width: { min: 320 , max:3840 },
    height: { min: 240, max:2160 },
    aspectRatio: 1.777777778,
  },
}

export const videoMinimumSize = {
  width: 426,
  height: 240,
}

export const WebSocketURL = process.env.NEXT_PUBLIC_WEBSOCKET_URL

export const supportedTheme: string[] = [
  "light", "dark", "cupcake", "bumblebee",
  "emerald", "corporate", "synthwave", "retro",
  "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel",
  "fantasy", "wireframe", "black", "luxury",
  "dracula", "cmyk", "autumn", "business",
  "acid", "lemonade", "night", "coffee",
  "winter", "dim", "nord", "sunset",
] as const;

export const defaultButtonSizeClassName = 'w-[54px] h-[54px] min-h-[54px]';
export const defaultModalSizeClassName = 'max-w-[960px] min-h-[75vh]';

export const defaultButtonSize = 26;
