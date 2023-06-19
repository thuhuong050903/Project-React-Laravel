<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div class="container mx-auto m-6 p-6">
    <form method="POST" class="w-full max-w-lg" action="{{route('contact.send')}}">
      @csrf
      <div class="form-floating mb-3">
        <input type="email" name="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <button type="submit" class="btn btn-primary">gửi</button>
      </div>
    </form>

  </div>
</body>
</html>