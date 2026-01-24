# Ollama Model Management Guide

This guide explains how to manage your local AI models using the Ollama terminal commands.

## 1. Checking Status
To see what is currently running and using your system memory (RAM/GPU):
```powershell
ollama ps
```

To see all models you have downloaded:
```powershell
ollama list
```

---

## 2. Stopping Models (Freeing Memory)
If your computer is slow or you are pulling a large model, use these commands:

### Stop a specific model
```powershell
ollama stop <model_name>
# Example: ollama stop qwen2.5-coder:7b
```

### Stop ALL models (Force Close Ollama)
If models are stuck or you want to clear everything:
```powershell
stop-process -name ollama*
```
*Note: This will also close the tray icon. You can restart it by searching for "Ollama" in your Start menu.*

---

## 3. Starting Models
### Run a model in terminal (Chat mode)
```powershell
ollama run <model_name>
```

### Pull/Download a new model
```powershell
ollama pull <model_name>
```

---

## 4. Common Model Names
- `qwen2.5-coder:7b` (Your current fast model)
- `qwen2.5:14b-instruct-q5_K_M` (The powerful model you are downloading)
- `llama3.2:latest` (Standard Meta model)
