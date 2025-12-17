package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		fmt.Fprint(w, `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TECHNICAL TEST TAKE-HOME</title>
<style>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f2f2f2;
        font-family: Arial, sans-serif;
    }
    h1 {
        font-size: 48px;
        font-weight: bold;
        color: #222;
        text-align: center;
    }
</style>
</head>
<body>
    <h1>INI AKSES VIA IKAN v2</h1>
</body>
</html>
        `)
	})

	fmt.Println("🔥 Running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
