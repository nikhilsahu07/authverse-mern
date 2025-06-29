import { Toaster } from 'react-hot-toast';

const NotificationProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(30, 41, 59, 0.8)', // slate-800/80
          backdropFilter: 'blur(20px) saturate(180%)',
          color: 'rgb(241, 245, 249)', // slate-100
          border: '1px solid rgba(71, 85, 105, 0.3)', // slate-600/30
          borderRadius: '16px',
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(59, 130, 246, 0.1)',
          fontSize: '14px',
          fontWeight: '500',
          padding: '12px 16px',
          maxWidth: '400px',
        },
        success: {
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: 'rgb(241, 245, 249)',
          },
          iconTheme: {
            primary: 'rgb(34, 197, 94)', // green-500
            secondary: 'rgb(241, 245, 249)', // slate-100
          },
        },
        error: {
          duration: 5000,
          style: {
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 127, 0.1))',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: 'rgb(241, 245, 249)',
          },
          iconTheme: {
            primary: 'rgb(239, 68, 68)', // red-500
            secondary: 'rgb(241, 245, 249)', // slate-100
          },
        },
        loading: {
          style: {
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: 'rgb(241, 245, 249)',
          },
          iconTheme: {
            primary: 'rgb(99, 102, 241)', // indigo-500
            secondary: 'rgb(241, 245, 249)', // slate-100
          },
        },
      }}
    />
  );
};

export default NotificationProvider;
