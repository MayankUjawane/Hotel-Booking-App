import API_CONFIG from '@/config/api.config';
import { PATHS } from '@/config/path.config';
import { useMutation } from '@/lib/hooks/useMutation';
import { AUTH_TOKEN_KEY, setStorageItem } from '@/lib/storage-manager';
import { signUpSchema } from '@/lib/validators/auth-form-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useSignUpForm = () => {
  const navigate = useNavigate();

  const { pending, mutate } = useMutation(API_CONFIG.AUTH.SIGN_UP, 'POST');

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  function handleSignUpSubmit(data) {
    mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        toast('Sign Up Successful', {
          description: 'Use your credentials to Sign in',
          type: 'success',
        });
        setStorageItem(AUTH_TOKEN_KEY, response.data.accessToken);
        navigate(PATHS.SIGN_IN);
      },
      onError: (err) => {
        console.log(err);
        toast(`Error: ${err.status || ''}`, {
          description: err.message || 'Something went wrong',
          type: 'error',
        });
      },
    });
  }

  return { form, handleSignUpSubmit, pending };
};
