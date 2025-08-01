.PHONY: help build clean test deploy-emulators deploy-functions download-quotes

help: ## Show this help message
	@echo "DailyQuoteBot - Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Build the Android app
	./gradlew assembleDebug

build-release: ## Build release APK
	./gradlew assembleRelease

clean: ## Clean build files
	./gradlew clean

test: ## Run tests
	./gradlew test

install: ## Install debug APK on connected device
	./gradlew installDebug

deploy-emulators: ## Start Firebase emulators
	firebase emulators:start

deploy-functions: ## Deploy Cloud Functions
	cd functions && npm install && firebase deploy --only functions

deploy-rules: ## Deploy Firestore security rules
	firebase deploy --only firestore:rules

deploy-all: ## Deploy all Firebase resources
	firebase deploy

download-quotes: ## Download quotes from quotable.io
	python scripts/download_quotes.py

setup: ## Initial project setup
	@echo "Setting up DailyQuoteBot project..."
	@echo "1. Make sure you have google-services.json in app/ directory"
	@echo "2. Run 'make deploy-functions' to deploy Cloud Functions"
	@echo "3. Run 'make download-quotes' to get initial data"
	@echo "4. Run 'make build' to build the app"
	@echo "5. Run 'make install' to install on device"

lint: ## Run linting
	./gradlew lint

format: ## Format code
	./gradlew ktlintFormat 