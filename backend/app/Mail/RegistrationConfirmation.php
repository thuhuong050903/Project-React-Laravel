<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
class RegistrationConfirmation extends Mailable
{
    use Queueable, SerializesModels;
    public $verificationLink;

    /**
     * Create a new message instance.
     *
     * @param string $verificationLink
     */
    public function __construct($verificationLink)
    {
        $this->verificationLink = $verificationLink;
    }
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.registration')
            ->subject('Email Confirmation');
    }
}
