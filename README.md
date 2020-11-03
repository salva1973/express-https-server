# express-https-server

**Key and certificate generation**
----------------------------------------------------------------

*Generating a Self-Signed Certificate*

The certificate format used by the SSL/TLS protocol is X.509 developed by IETF. 
To generate an SSL certificate, we are going to use OpenSSL.

>OpenSSL is one of the most popular toolchains for TLS communication. It is also a command line interface (CLI) and toolkit to generate SSL certificates, private keys, CSRs and perform other kinds of cryptography operations.

First of all, we need a private key .key file and a certificate signing request .csr file. We are going to use the RSA cryptography to encrypt traffic on our server. To create these files, use the below command.


    $ openssl req -new -newkey rsa:2048 -nodes -keyout sec.key -out sec.csr

The command above generates salva.key file which is RSA 2048 bits private key file and a CSR in salva.csr file which contains the matching public key.
This command asks for some input information about CSR among which Common Name is critical. This field basically tells the CA about the domain name for which a certificate has to be generated. You can also opt for a wildcard certificate.

Now that we have a CSR, instead of submitting it to a CA, we are going to sign it ourselves using our own private key.

    $ openssl x509 -req -days 365 -in sec.csr -signkey sec.key -out sec.crt

The command above generates a sec.crt certificate file that is self-signed, which also means that it has no root CA.

----------------------------------------------------------------  
<br/><br/>

**Mapping the domain name to an IPV4 address**
----------------------------------------------------------------

*MacOS X*

Modify your host file like this:

    $sudo nano /private/etc/hosts

and add the following at the end of the file:

    127.0.0.1 your-domain.com www.your-doimain.com

(replacing the domain with the actual domain)