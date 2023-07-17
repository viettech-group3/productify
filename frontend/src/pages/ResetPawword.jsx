import { React, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    const tokenParam = urlParams.get('token');

    setEmail(emailParam);
    setToken(tokenParam);
  }, []);

  const handleNewPasswordChange = event => {
    setNewPassword(event.target.value);
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);

      // Send a request to the backend API
      const response = await axios.post(
        'http://localhost:5000/api/users/resetpassword',
        {
          email,
          token,
          newPassword,
        },
      );
      console.log(response.status);
      // Handle the response
      if (response.status === 200) {
        // Password reset successful
        toast.success(
          'Password reset successful. Go back to login page to continue',
        );
        return;
      }
      if (response.status === 401) {
        // Password reset failed
        toast.error('Invalid credentials');
        return;
      } else {
        toast.error('Password reset failed');
        return;
      }
    } catch (error) {
      toast.error('Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Toaster />
      <Form className="w-50">
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} readOnly />
        </Form.Group>
        <Form.Group controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleResetPassword}
          disabled={isLoading}
          style={{ marginTop: '20px' }}
        >
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
