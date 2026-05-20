<script lang="ts">
//property passed into the component
	let { title = '', children } = $props();//'' empty string if not title provided
</script>
//Bulma CSS clases
<div class="card mb-5">
	<header class="card-header">
		<p class="card-header-title">
			<span class="icon"><i class="fas fa-coins"></i></span><span>{title}</span>
		</p>
	</header>
	//make component reusable by rendering children inside the card content. This allows to use the Card component as a wrapper for any content you want to display within a styled card layout, making it versatile for different use cases throughout application.
	<div class="card-content">
		<div class="content">
			{@render children()}
		</div>
	</div>
</div>
