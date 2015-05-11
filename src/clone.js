function clone ( arg, fn ) {
	return fn ? arg : JSON.parse( JSON.stringify( arg ) )
}
