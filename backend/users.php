<?php
require_once 'init.php';
?>
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	    <script src="https://kit.fontawesome.com/784ace4cf4.js"></script>
		<title>MCL Zero | Users</title>
	</head>
	<body>
		<nav class="navbar navbar-expand-sm navbar-light bg-light">
			<div class="container">
				<a class="navbar-brand" href="index.php">
					<img src="logo.svg" height="30" class="d-inline-block align-top" alt="">
					&nbsp;<i class="fal fa-chevron-double-right"></i> MCL <i>Zero</i>
				</a>

				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item">
							<a class="nav-link" href="index.php">Breaches</a>
						</li>
						<li class="nav-item active">
							<a class="nav-link" href="users.php">Users <span class="sr-only">(current)</span></a>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<div style="height: 32px"></div>

		<?php
		if(isset($_GET['username']) && !empty($_GET['username'])) {
			$username = mysqli_real_escape_string($db, $_GET['username']);
			$q = mysqli_query($db, "SELECT * FROM `users` WHERE `username` = '$username' LIMIT 25");
		} else if(isset($_GET['name']) && !empty($_GET['name'])) {
			$name = mysqli_real_escape_string($db, $_GET['name']);
			$q = mysqli_query($db, "SELECT * FROM `users` WHERE `name` = '$name' LIMIT 25");
		} else {
			$q = mysqli_query($db, "SELECT * FROM `users` LIMIT 25");
		}

		?>

		<div class="container">
			<?php if(isset($_GET['success'])) { ?>
			<div class="alert alert-success" role="alert">
			  <b><i class="fas fa-check"></i> &nbsp;Success!</b> Removed user from database.
			</div>
			<?php } ?>
			<h2>Users</h2>

			<div style="height: 16px;"></div>
			<div class="card">
				<div class="card-body">
					<form action="users.php" method="get">
						<label for="exampleInputEmail1">Filter by Username / Email Address</label>
						<div class="form-row">
							<div class="col-8">
								<input type="text" class="form-control" placeholder="Username or Email" name="username">
							</div>
							<div class="col">
								<button class="btn btn-primary btn-block" type="submit"><i class="fas fa-search"></i> &nbsp;Search</button>
							</div>
						</div>
					</form>
					<div style="height: 32px;"></div>
					<form action="users.php" method="get">
						<label for="exampleInputEmail1">Filter by Name</label>
						<div class="form-row">
							<div class="col-8">
								<input type="text" class="form-control" placeholder="Name" name="name">
							</div>
							<div class="col">
								<button class="btn btn-primary btn-block" type="submit"><i class="fas fa-search"></i> &nbsp;Search</button>
							</div>
						</div>
					</form>
				</div>
			</div>

			<div style="height: 32px;"></div>
			<?php
			if(mysqli_num_rows($q) == 0) {
			?>
			<div class="card">
				<div class="card-body">
					<p>No results for that query.<br>
					<a href="users.php"><i class="fas fa-undo-alt"></i> &nbsp;Back</a></p>
				</div>
			</div>
			<?php
			} else {
			?>
			<table class="table table-dark">
				<thead>
					<th scope="col">Internal ID</th>
					<th scope="col">Name</th>
					<th scope="col">Username</th>
					<th scope="col">Examine</th>
				</thead>
				<tbody>
					<?php
					while($data = mysqli_fetch_assoc($q)) {
					?>
					<tr>
						<th scope="row"><?=$data['id']?></th>
						<td><?=$data['name']?></td>
						<td><?=$data['username']?></td>
						<td><a class="btn btn-primary" href="user.php?uid=<?=$data['id']?>" role="button">Examine &nbsp;<i class="fal fa-chevron-double-right"></i></a></td>
					</tr>
					<?php
					}
					?>
				</tbody>
			</table>
			<?php
			}
			?>
		</div>

		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	</body>
</html>