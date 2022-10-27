app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
