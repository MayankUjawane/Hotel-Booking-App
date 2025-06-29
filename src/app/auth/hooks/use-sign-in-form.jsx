import API_CONFIG from '@/config/api.config';
import { PATHS } from '@/config/path.config';
import { useMutation } from '@/lib/hooks/useMutation';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import { signInSchema } from '@/lib/validators/auth-form-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useSignInForm = () => {
  const navigate = useNavigate();
  const { refetchCurrentUser } = useAuthContext();

  const { pending, mutate } = useMutation(API_CONFIG.AUTH.SIGN_IN, 'POST');

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  function handleSignInSubmit(data) {
    mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        toast('Sign In Successful', {
          type: 'success',
        });
        refetchCurrentUser();
        navigate(PATHS.LANDING);
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

  return { form, handleSignInSubmit, pending };
};
