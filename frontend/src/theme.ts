import { createTheme } from '@mui/material';
import { toolbarTobAndBottomColor } from './styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiTextField: {
      // Общие настройки для MuiTextField
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      // Переопределение стилей для MuiTextField
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#ffffff', // цвет текста лейбла
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            color: '#ffffff', // цвет текста лейбла при сжатии
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
              borderColor: '#8a8a8a', // цвет рамки текстового поля
            },
            '&:hover fieldset': {
              borderColor: '#ffffff', // цвет рамки текстового поля при наведении
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff', // цвет рамки текстового поля при фокусировке
            },
            '& .MuiInputLabel-root': {
              color: '#ffffff', // цвет текста лейбла при фокусировке
            },
            '& .MuiOutlinedInput-input': {
              color: '#ffffff', // цвет текста внутри текстового поля
            },
          },
        },
      },
      // Варианты стилей для различных вариантов MuiTextField
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            '& .MuiInputLabel-root': {
              color: '#000000', // цвет текста лейбла
            },
            '& .MuiInputLabel-shrink': {
              color: 'white', // цвет текста лейбла при сжатии
            },
            // '& .MuiFilledInput-root': {
            //   backgroundColor: 'rgba(255,255,255,0.49)', // цвет фона для текстового поля
            // },
          },
        },
        {
          props: { variant: 'standard' },
          style: {
            '& .MuiInputLabel-root': {
              color: '#000000', // цвет текста лейбла
            },
            '& .MuiInputLabel-shrink': {
              color: 'white', // цвет текста лейбла при сжатии
            },
            '& .MuiInputBase-input': {
              color: '#000000', // цвет текста внутри текстового поля
            },
          },
        },
      ],
    },
    MuiSelect: {
      // Переопределение стилей для MuiSelect
      styleOverrides: {
        icon: {
          color: '#ffffff', // цвет иконки селекта
        },
        select: {
          '&:focus': {
            backgroundColor: 'transparent', // убираем фон при фокусировке
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent', // убираем фон при фокусировке
          },
          // '&:not([multiple]) option, &:not([multiple]) optgroup': {
          //   backgroundColor: 'rgba(255, 255, 255, 0.7)', // цвет фона для опций
          // },
          color: '#ffffff', // цвет текста в селекте
        },
      },
    },
    MuiMenuItem: {
      // Переопределение стилей для MuiMenuItem
      styleOverrides: {
        root: {
          color: 'black', // цвет текста опции в выпадающем списке
        },
      },
    },
    MuiFormControl: {
      // Переопределение стилей для MuiFormControl
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#ffffff', // цвет текста лейбла для MuiSelect
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            color: '#ffffff', // цвет текста лейбла при сжатии
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
              borderColor: '#ffffff', // цвет рамки текстового поля
            },
            '&:hover fieldset': {
              borderColor: '#ffffff', // цвет рамки текстового поля при наведении
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff', // цвет рамки текстового поля при фокусировке
            },
          },
          '& .MuiSelect-root': {
            color: '#ffffff', // цвет текста внутри селекта
          },
          '& .MuiSelect-icon': {
            color: '#ffffff', // цвет иконки селекта
          },
        },
      },
    },
  },
});

export const themeDiscount = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: toolbarTobAndBottomColor, // цвет текста лейбла
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            color: toolbarTobAndBottomColor, // цвет текста лейбла при сжатии
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
              borderColor: toolbarTobAndBottomColor, // цвет рамки текстового поля
            },
            '&:hover fieldset': {
              borderColor: toolbarTobAndBottomColor, // цвет рамки текстового поля при наведении
            },
            '&.Mui-focused fieldset': {
              borderColor: toolbarTobAndBottomColor, // цвет рамки текстового поля при фокусировке
            },
            '& .MuiInputLabel-root': {
              color: toolbarTobAndBottomColor, // цвет текста лейбла при фокусировке
            },
            '& .MuiOutlinedInput-input': {
              color: '#000000', // цвет текста внутри текстового поля
            },
          },
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        color: 'default', // Цвет по умолчанию
      },
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: toolbarTobAndBottomColor, // Цвет радиокнопки при выборе
          },
        },
      },
    },
  },
});

export const themeBlackSelect = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#000000', // Черная иконка стрелки
        },
        select: {
          color: '#000000', // Черный текст в селекте
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#000000', // Черный текст в выпадающем списке
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#000000', // Черный цвет лейбла
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            color: '#000000 !important', // Черный цвет лейбла при сжатии
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000', // Черная рамка
            },
            '&:hover fieldset': {
              borderColor: '#000000', // Черная рамка при наведении
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000', // Черная рамка при фокусе
            },
          },
        },
      },
    },
  },
});

export default theme;
