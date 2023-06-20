<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Http\Controllers\PasswordResetController;
class ResetPasswordRequest extends Notification
{
    public $token;
    public $email;

    public function __construct($token,$email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Your Reset Password Link')
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', route('password.reset', ['token' => $this->token, 'email' => $this->email]))
            ->line('If you did not request a password reset, no further action is required.');
    }
}