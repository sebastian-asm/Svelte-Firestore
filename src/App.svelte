<script>
	import { db } from './firebase';
	import Noty from 'noty';
	
	import 'noty/lib/noty.css';

	let tarea = {nombre: '', descripcion: ''};
	let tareas = [];
	let editarEstado = false;
	let idActual;

	db.collection('tareas')
		.orderBy('createdAt', 'asc')
		.onSnapshot(resp => {
			let docs = [];
			resp.forEach(doc => {
				docs.push({...doc.data(), id: doc.id});
			});
			tareas = [...docs];
		});

	const guardarTarea = async () => {
		if (!editarEstado) {
			agregarTarea();
		} else {
			actualizarTarea();
			editarEstado = false;
		}

		tarea = {nombre: '', descripcion: ''};
	};

	const agregarTarea = async () => {
		try {
			await db.collection('tareas').doc().set({
				...tarea,
				createdAt: Date.now()
			});
	
			new Noty({
				theme: 'sunset',
				type: 'info',
				text: 'Tarea agregada correctamente',
				timeout: 3000
			}).show();
		} catch (error) {
			console.log(error);
		}
	};

	const actualizarTarea = async () => {
		await db.collection('tareas').doc(idActual).update({
			nombre: tarea.nombre,
			descripcion: tarea.descripcion
		});

		new Noty({
			theme: 'sunset',
			type: 'success',
			text: 'Tarea actualizada correctamente',
			timeout: 3000
		}).show();
	};

	const eliminarTarea = async (id) => {
		await db.collection('tareas').doc(id).delete();

		new Noty({
			theme: 'sunset',
			type: 'warning',
			text: 'Tarea eliminada correctamente',
			timeout: 3000
		}).show();
	};

	const editarTarea = async (tareaActual) => {
		editarEstado = true;
		tarea = {...tareaActual};
		idActual = tareaActual.id;
	};

	const cancelar = () => {
		editarEstado = false;
		tarea = {nombre: '', descripcion: ''};
	};
</script>

<main class="container">
	<h1 class="display-4 my-4">Lista de tareas</h1>

	<div class="row">
		<div class="col-sm-12 col-md-6 mb-4">
			<form on:submit|preventDefault={guardarTarea}>
				<div class="card">
					<div class="card-body">
						<h4 class="card-title mb-4">Agregar nueva tarea</h4>
						<input bind:value={tarea.nombre} type="text" placeholder="Nombre de la tarea" class="form-control mb-4" required>
						<textarea bind:value={tarea.descripcion} rows="5" placeholder="Descripción de la tarea" class="form-control" required></textarea>
					</div>
	
					<div class="card-footer">
						<button type="submit" class="btn btn-primary">
							{#if !editarEstado}
								Guardar {:else} Actualizar
							{/if}
						</button>
				
						{#if editarEstado}
							<button on:click={cancelar} class="btn btn-secondary ml-2">
								Cancelar
							</button>
						{/if}
					</div>
				</div>
			</form>
		</div>

		<div class="col-sm-12 col-md-6">
			{#if tareas.length === 0}
				<div class="card shadow-sm mb-4">
					<div class="card-body text-center">
						La lista de tareas en vacía.
					</div>
				</div>
			{/if}
			
			{#each tareas as tarea}
				<div class="card shadow-sm mb-4">
					<div class="card-body">
						<h5 class="card-title">{tarea.nombre}</h5>
						<p class="card-text">{tarea.descripcion}</p>

						<button on:click={eliminarTarea(tarea.id)} class="btn btn-danger">
							Eliminar
						</button>
						<button on:click={editarTarea(tarea)} class="btn btn-success">
							Editar
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	textarea {
		resize: none;
	}
</style>