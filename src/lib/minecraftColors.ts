type MinecraftColor = {
    [key: string]: string;
  };
  
  export const minecraftColors: MinecraftColor = {
    '0': '#000000', // Black
    '1': '#0000AA', // Dark Blue
    '2': '#00AA00', // Dark Green
    '3': '#00AAAA', // Dark Aqua
    '4': '#AA0000', // Dark Red
    '5': '#AA00AA', // Dark Purple
    '6': '#FFAA00', // Gold
    '7': '#AAAAAA', // Gray
    '8': '#555555', // Dark Gray
    '9': '#5555FF', // Blue
    'a': '#55FF55', // Green
    'b': '#55FFFF', // Aqua
    'c': '#FF5555', // Red
    'd': '#FF55FF', // Light Purple
    'e': '#FFFF55', // Yellow
    'f': '#FFFFFF', // White
  } as const;
  
  interface TextPart {
    text: string;
    color: string;
    bold: boolean;
    italic: boolean;
    underlined: boolean;
    strikethrough: boolean;
  }
  
  export function parseMinecraftText(text: string): TextPart[] {
    const parts: TextPart[] = [];
    let currentColor = 'f';
    let currentFormat = {
      bold: false,
      italic: false,
      underlined: false,
      strikethrough: false,
    };
  
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '§' && i + 1 < text.length) {
        const code = text[i + 1].toLowerCase();
        if (code in minecraftColors) {
          currentColor = code;
        } else if (code === 'l') {
          currentFormat.bold = true;
        } else if (code === 'n') {
          currentFormat.underlined = true;
        } else if (code === 'o') {
          currentFormat.italic = true;
        } else if (code === 'm') {
          currentFormat.strikethrough = true;
        } else if (code === 'r') {
          currentColor = 'f';
          currentFormat = {
            bold: false,
            italic: false,
            underlined: false,
            strikethrough: false,
          };
        }
        i++;
      } else {
        parts.push({
          text: text[i],
          color: minecraftColors[currentColor] || '#FFFFFF',
          ...currentFormat,
        });
      }
    }
  
    return parts;
  }