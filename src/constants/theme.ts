interface Theme {
  colors: {
    background: string;
    background_secondary: string;
    border: string;
    text_black: string;
    text_disabled: string;
    backdrop: string;
  };
  fontSize: {
    fontSize_10: number;
    fontSize_12: number;
    fontSize_14: number;
    fontSize_16: number;
    fontSize_18: number;
    fontSize_20: number;
    fontSize_22: number;
    fontSize_24: number;
    fontSize_28: number;
    fontSize_32: number;
    fontSize_128: number;
  };
  spacing: {
    spacing_1: number;
    spacing_2: number;
    spacing_4: number;
    spacing_6: number;
    spacing_8: number;
    spacing_10: number;
    spacing_12: number;
    spacing_14: number;
    spacing_16: number;
    spacing_18: number;
    spacing_20: number;
    spacing_22: number;
    spacing_24: number;
    spacing_26: number;
    spacing_28: number;
    spacing_30: number;
    spacing_32: number;
    spacing_36: number;
    spacing_40: number;
    spacing_42: number;
    spacing_48: number;
    spacing_50: number;
    spacing_58: number;
    spacing_60: number;
    spacing_64: number;
    spacing_70: number;
    spacing_76: number;
    spacing_80: number;
    spacing_86: number;
    spacing_90: number;
    spacing_94: number;
    spacing_96: number;
    spacing_128: number;
    spacing_256: number;
  };
  fontWeight: {
    fontWeight_100: '100';
    fontWeight_200: '200';
    fontWeight_300: '300';
    fontWeight_400: '400';
    fontWeight_500: '500';
    bold: 'bold';
  };
}

const theme: Theme = {
  colors: {
    background: 'blanchedalmond',
    background_secondary: '#c1b9a4',
    border: '#4c4034',
    text_black: 'black',
    text_disabled: 'gray',
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
  fontSize: {
    fontSize_10: 10,
    fontSize_12: 12,
    fontSize_14: 14,
    fontSize_16: 16,
    fontSize_18: 18,
    fontSize_20: 20,
    fontSize_22: 22,
    fontSize_24: 24,
    fontSize_28: 28,
    fontSize_32: 32,
    fontSize_128: 128,
  },
  spacing: {
    spacing_1: 1,
    spacing_2: 2,
    spacing_4: 4,
    spacing_6: 6,
    spacing_8: 8,
    spacing_10: 10,
    spacing_12: 12,
    spacing_14: 14,
    spacing_16: 16,
    spacing_18: 18,
    spacing_20: 20,
    spacing_22: 22,
    spacing_24: 24,
    spacing_26: 26,
    spacing_28: 28,
    spacing_30: 30,
    spacing_32: 32,
    spacing_36: 36,
    spacing_40: 40,
    spacing_42: 42,
    spacing_48: 48,
    spacing_50: 50,
    spacing_58: 58,
    spacing_60: 60,
    spacing_64: 64,
    spacing_70: 70,
    spacing_76: 76,
    spacing_80: 80,
    spacing_86: 86,
    spacing_90: 90,
    spacing_94: 94,
    spacing_96: 96,
    spacing_128: 128,
    spacing_256: 256,
  },
  fontWeight: {
    fontWeight_100: '100',
    fontWeight_200: '200',
    fontWeight_300: '300',
    fontWeight_400: '400',
    fontWeight_500: '500',
    bold: 'bold',
  },
};

export default theme;
