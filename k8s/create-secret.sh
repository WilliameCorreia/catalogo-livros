#!/bin/bash
# =============================================================================
# Cria o Secret "db-credentials" no cluster Kubernetes.
#
# Execute ANTES de aplicar os demais manifests:
#   chmod +x k8s/create-secret.sh
#   ./k8s/create-secret.sh
#
# O Kubernetes faz o encode base64 internamente — passe os valores em texto puro.
# =============================================================================

NAMESPACE="catalogo"
POSTGRES_PASSWORD="sua_senha_aqui"
DATABASE_URL="postgresql://catalogo:${POSTGRES_PASSWORD}@postgres-service:5432/catalogo_livros"

kubectl create secret generic db-credentials \
  --namespace="${NAMESPACE}" \
  --from-literal=POSTGRES_PASSWORD="${POSTGRES_PASSWORD}" \
  --from-literal=DATABASE_URL="${DATABASE_URL}"
