var adminTest = function(req){
  if ( !req.user || !req.user.isAdmin) return false;
  return true;
}

module.exports = {
  adminTest: adminTest
}
