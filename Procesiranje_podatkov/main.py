from fastapi import FastAPI
import subprocess

app = FastAPI()

@app.get("/run")
def run_script():
    result = subprocess.run(["python", "preprocess.py"])
    return {"status": "preprocessing done", "exit_code": result.returncode}
