<?php
require_once 'init.php';

if(!isset($_GET['uid']) || empty($_GET['uid'])) {
	header("Location: users.php");
	exit();
} else {
	$uid = mysqli_real_escape_string($db, $_GET['uid']);
	if(isset($_GET['delete'])) {
		mysqli_query($db, "DELETE FROM `users` WHERE `id` = $uid");
		header("Location: users.php?success");
		exit();
	} else if (!empty($_POST)) {
		$username = mysqli_real_escape_string($db, $_POST['username']);
		$name = mysqli_real_escape_string($db, $_POST['name']);
		mysqli_query($db, "UPDATE `users` SET `username` = '$username', `name` = '$name' WHERE `id` = $uid");
		header("Location: user.php?uid=$uid&success");
		exit();
	}
}

?>
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	    <script src="https://kit.fontawesome.com/784ace4cf4.js"></script>
		<title>MCL Zero | User</title>
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

		<div class="container">
			<h2>User #<?=$uid?></h2>
			<div class="card">
				<div class="card-body">
					<?php
					$q = mysqli_query($db, "SELECT * FROM `users` WHERE `id` = $uid");
					$data = mysqli_fetch_assoc($q);
					?>
					<form action="" method="post">
						<label for="exampleInputEmail1">Update User Data</label>
						<div class="form-row">
							<div class="col-5">
								<input type="text" class="form-control" placeholder="Username" name="username" value="<?=$data['username']?>">
							</div>
							<div class="col-4">
								<input type="text" class="form-control" placeholder="Name" name="name" value="<?=$data['name']?>">
							</div>
							<div class="col">
								<button class="btn btn-primary btn-block" type="submit"><i class="fas fa-redo-alt"></i> &nbsp;Update</button>
							</div>
							<div class="col">
								<a class="btn btn-danger btn-block" href="user.php?uid=<?=$uid?>&delete"><i class="fas fa-trash"></i> &nbsp;Delete</a>
							</div>
						</div>
					</form>
					<?php if(isset($_GET['success'])) { ?>
					<div style="height: 16px;"></div>
					<div class="alert alert-success" role="alert" style="margin-bottom: 0;">
					  <b><i class="fas fa-check"></i> &nbsp;Success!</b> Updated user data.
					</div>
					<?php } ?>
				</div>
			</div>
			<div style="height: 16px"></div>
			<div class="card">
				<div class="card-body">
					<?php
					$q = mysqli_query($db, "SELECT * FROM `passwords` p, `breaches` b WHERE `user_id` = $uid AND p.breach_id = b.id")
					?>
					<h4>Passwords</h4>
					<div style="height: 8px"></div>
					<table class="table table-dark">
						<thead>
							<th scope="col">Breach</th>
							<th scope="col">Type</th>
							<th scope="col">Password</th>
						</thead>
						<tbody>
							<?php
								while($data = mysqli_fetch_assoc($q)) {
							?>
							<tr>
								<th scope="row"><?=$data['name']?></th>
								<td><?=$data['password_type']?></td>
								<td><?=$data['password']?></td>
							</tr>
							<?php
								}
							?>
						</tbody>
					</table>
				</div>
			</div>
			<div style="height: 16px"></div>
			<div class="card">
				<div class="card-body">
					<?php
					$q = mysqli_query($db, "SELECT dt.name as `tname`, b.name as `bname`, `data` FROM `data` d, `datatypes` dt, `breaches` b WHERE `user_id` = $uid AND d.datatype_id = dt.id AND d.breach_id = b.id")
					?>
					<h4>Data</h4>
					<div style="height: 8px"></div>
					<table class="table table-dark">
						<thead>
							<th scope="col">Breach</th>
							<th scope="col">Type</th>
							<th scope="col">Data</th>
							<th scope="col">Examine</th>
						</thead>
						<tbody>
							<?php
								while($data = mysqli_fetch_assoc($q)) {
									$url = "";
									if($data['tname'] == "IP addresses") {
										$url = "https://ipinfo.io/" . $data['data'];
									} else if ($data['tname'] == "Phone numbers") {
										$url = "http://www.americaphonebook.com/reverse.php?number=7172789539";
									}
							?>
							<tr>
								<th scope="row"><?=$data['bname']?></th>
								<td><?=$data['tname']?></td>
								<td><?=$data['data']?></td>
								<?php if(!empty($url)) { ?>
								<td><a class="btn btn-primary" href="<?=$url?>" target="_blank" role="button">Examine &nbsp;<i class="fal fa-chevron-double-right"></i></a></td>
								<?php } else { ?>
								<td></td>
								<?php } ?>
							</tr>
							<?php
								}
							?>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	</body>
</html>