<script lang="ts">
</script>

<div>
	<div class="field">
		<label class="label" for="amount">Enter PlaceMark name:</label>
		<input class="input" id="amount" name="amount" type="number" />
	</div>
	<div class="field">
		<div class="control">
			<label class="label" for="amount">Select Rating:</label>
			<input class="radio" type="radio" /> Recommend
			<input class="radio" type="radio" /> Do not recommensd
		</div>
	</div>
	<div class="field">
		<label class="label" for="amount">Select Category:</label>
		<div class="select">
			<select>
				<option>Dublin</option>
				<option>Monument</option>
				<option>Library</option>
			</select>
		</div>
	</div>
	<div class="field">
		<div class="control">
			<button class="button is-success is-fullwidth">Add placeMark</button>
		</div>
	</div>
</div>
