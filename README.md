jquery.paginate
===============

Simple pagination for jQuery

## options

Accepts the following options - all are optional with the defaults shown

	'itemsperpage'			: 9, // number of items to show
	'pagingtop'				: true, // show paging at the top
	'pagingbottom'			: true, // show paging at the bottom
	'classname'				: '', // class name to apply to the <ol>
	'lazyload'				: true, // load images when visible
	'element'				: 'div' // if using a list change to li
	
## example


	<div id="mylisting">

		<div>
			<img src="image_1.jpg" alt="Image 1">
			Image 1
		</div>
		<div>
			<img src="image_2.jpg" alt="Image 2">
			Image 2
		</div>
		<div>
			<img src="image_3.jpg" alt="Image 3">
			Image 3
		</div>
		<div>
			<img src="image_4.jpg" alt="Image 4">
			Image 4
		</div>
		<div>
			<img src="image_5.jpg" alt="Image 5">
			Image 5
		</div>
		<div>
			<img src="image_6.jpg" alt="Image 6">
			Image 6
		</div>
		<div>
			<img src="image_7.jpg" alt="Image 7">
			Image 7
		</div>
		<div>
			<img src="image_8.jpg" alt="Image 8">
			Image 8
		</div>
		<div>
			<img src="image_9.jpg" alt="Image 9">
			Image 9
		</div>
	
	</div>

	<script src="assets/js/jquery.paginate.min.js"></script>
	<script>
	jQuery(function ($){
		$('#mylisting').paginate({
			itemsperpage:6,
			classname:'paginator'
		});
	});
	</script>
