define('bar', ['baz'], function(baz) {
  console.log('bar is reading');
  return 'bar definitions - requires baz: ' + baz;
});