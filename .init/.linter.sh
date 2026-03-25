#!/bin/bash
cd /home/kavia/workspace/code-generation/insurance-fraud-detection-platform-40-52/investigator_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

