import './global'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.less'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'
import reportWebVitals from './reportWebVitals'

import { ThemeProvider } from '@material-tailwind/react'
import { AppProvider } from 'contexts/app.context'

const theme = {
  accordion: {
    defaultProps: {
      icon: undefined,
      className: 'buh buh lmao',
      animate: {
        unmount: {},
        mount: {}
      },
      disabled: false
    },
    styles: {
      base: {
        container: {
          display: 'block',
          position: 'relative',
          width: 'w-full'
        },
        header: {
          initial: {
            display: 'flex',
            justifyContent: 'justify-between',
            alignItems: 'items-center',
            width: 'w-full ec-ec-69',
            py: 'py-4',
            borderWidth: 'border-b border-b-blue-gray-100',
            color: 'text-blue-gray-700',
            fontSmoothing: 'antialiased',
            fontFamily: 'font-sans',
            fontSize: 'text-xl',
            textAlign: 'text-left',
            fontWeight: 'font-semibold',
            lineHeight: 'leading-snug',
            userSelect: 'select-none',
            hover: '',
            transition: 'transition-colors'
          },
          active: { color: '!text-orange' },
          icon: {
            ml: 'ml-4'
          }
        },
        body: {
          display: 'block',
          width: 'w-full',
          py: 'py-4',
          color: 'text-gray-700',
          fontSmoothing: 'antialiased',
          fontFamily: 'font-sans',
          fontSize: 'text-sm',
          fontWeight: 'font-light',
          lineHeight: 'leading-normal'
        },
        disabled: {
          pointerEvents: 'pointer-events-none',
          opacity: 'opacity-50'
        }
      }
    }
  },
  drawer: {
    defaultProps: {
      size: 300,
      overlay: true,
      placement: 'left',
      overlayProps: undefined,
      className: '',
      dismiss: undefined,
      onClose: undefined,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    styles: {
      base: {
        drawer: {
          position: 'fixed',
          zIndex: 'z-[9999]',
          pointerEvents: 'pointer-events-auto',
          backgroundColor: 'bg-white',
          boxSizing: 'box-border',
          width: 'w-full',
          boxShadow: 'shadow-2xl shadow-blue-gray-900/10'
        },
        overlay: {
          position: 'absolute',
          inset: 'inset-0',
          width: 'w-full',
          height: 'h-[1000vh]',
          pointerEvents: 'pointer-events-auto',
          zIndex: 'z-[9995]',
          backgroundColor: 'bg-black',
          backgroundOpacity: 'bg-opacity-60',
          backdropBlur: 'backdrop-blur-sm'
        }
      }
    }
  },
  menu: {
    defaultProps: {
      placement: 'bottom',
      offset: 5,
      dismiss: {
        itemPress: true
      },
      animate: {
        unmount: {},
        mount: {}
      },
      lockScroll: false
    },
    styles: {
      base: {
        menu: {
          bg: 'bg-white',
          minWidth: 'min-w-[180px]',
          p: 'p-3',
          border: 'border border-blue-gray-50',
          borderRadius: 'rounded-md',
          boxShadow: 'shadow-lg shadow-blue-gray-500/10',
          fontFamily: 'font-sans',
          fontSize: 'text-sm',
          fontWeight: 'font-normal',
          color: 'text-blue-gray-500',
          overflow: 'overflow-auto',
          outline: 'focus:outline-none',
          zIndex: 'z-[999]'
        },
        item: {
          initial: {
            display: 'block',
            width: 'w-full',
            pt: 'pt-[9px]',
            pb: 'pb-2',
            px: 'px-3',
            borderRadius: 'rounded-md',
            textAlign: 'text-start',
            lightHeight: 'leading-tight',
            cursor: 'cursor-pointer',
            userSelect: 'select-none',
            transition: 'transition-all',
            bg: '',
            color:
              'hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900',
            outline: 'outline-none'
          },
          disabled: {
            opacity: 'opacity-50',
            cursor: 'cursor-not-allowed',
            pointerEvents: 'pointer-events-none',
            userSelect: 'select-none',
            bg: 'hover:bg-transparent focus:bg-transparent active:bg-transparent',
            color:
              'hover:text-blue-gray-500 focus:text-blue-gray-500 active:text-blue-gray-500'
          }
        }
      }
    }
  },
  list: {
    defaultProps: {
      ripple: true,
      className: ''
    },
    styles: {
      base: {
        list: {
          display: 'flex',
          flexDirection: 'flex-col',
          gap: 'gap-1',
          minWidth: 'min-w-[240px]',
          p: 'p-2',
          fontFamily: 'font-sans',
          fontSize: 'text-base',
          fontWeight: 'font-normal',
          color: 'text-blue-gray-700'
        },
        item: {
          initial: {
            display: 'flex',
            alignItems: 'items-center',
            width: 'w-full',
            padding: 'p-3',
            borderRadius: 'rounded-lg',
            textAlign: 'text-start',
            lightHeight: 'leading-tight',
            transition: 'transition-all',
            bg: '',
            color: 'hover:text-orange',
            outline: 'outline-none'
          },
          selected: {
            bg: 'bg-blue-gray-50/50',
            color: 'text-blue-gray-700'
          },
          disabled: {
            opacity: 'opacity-50',
            cursor: 'cursor-not-allowed',
            pointerEvents: 'pointer-events-none',
            userSelect: 'select-none',
            bg: 'hover:bg-transparent focus:bg-transparent active:bg-transparent',
            color:
              'hover:text-blue-gray-500 focus:text-blue-gray-500 active:text-blue-gray-500'
          }
        },
        itemPrefix: {
          display: 'grid',
          placeItems: 'place-items-center',
          marginRight: 'mr-4'
        },
        itemSuffix: {
          display: 'grid',
          placeItems: 'place-items-center',
          marginRight: 'ml-auto justify-self-end'
        }
      }
    }
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider value={theme}>
          <AppProvider>
            <App />
          </AppProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
