import { useColorScheme } from 'react-native';

export const themes = {
  light: {
    statusBar: 'dark',
    background: '#F4F5F9',
    card: '#FFFFFF',
    text: '#1B1B2F',
    textMuted: '#6B7280',
    primary: '#4F46E5',
    border: '#D1D5DB',
    inputBg: '#FFFFFF',
    danger: '#DC2626',
    shadow: '#000000',
  },
  dark: {
    statusBar: 'light',
    background: '#0F1020',
    card: '#1C1D33',
    text: '#F3F4F6',
    textMuted: '#9CA3AF',
    primary: '#818CF8',
    border: '#3B3D5C',
    inputBg: '#252642',
    danger: '#F87171',
    shadow: '#000000',
  },
};

export function useTheme() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? themes.dark : themes.light;
}