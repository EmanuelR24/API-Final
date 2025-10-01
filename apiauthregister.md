# Guía para testear la API en Postman

## 1. Registro de usuario

**Endpoint:** `POST /api/auth/register`  
**Body (JSON):**
```json
{
  "nombre": "Daniela cuesta",
  "email": "Dani12@example.com",
  "password": "123456",
  "rol": "vendedor"
}
```

## 2. Login de usuario

**Endpoint:** `POST /api/auth/login`  
**Body (JSON):**
```json
{
  "email": "Dani12@example.com",
  "password": "123456"
}
```



---

## 3. Crear producto

**Endpoint:** `POST /api/products`  
    
**Body (JSON):**
```json
{
  "nombre": "Bisturi",
  "descripcion": "Herramienta de plastico y acero",
  "precio": 9.50,
  "stock": 130,
  "categoria": "Herramientas"
}
```

## 4. Listar productos

**Endpoint:** `GET /api/products`  
  

---

## 5. Crear pedido

**Endpoint:** `POST /api/orders`  
    
**Body (JSON):**
```json
{
  "details": [
    {
      "productoId": "<id_producto1>",
      "cantidad": 12
    },
    {
      "productoId": "<id_producto2>",
      "cantidad": 24
    }
  ]
}
```
> Los `productoId` se obtienen de la respuesta de `/api/products`.

---

## 6. Listar pedidos

**Endpoint:** `GET /api/orders`  
  

---

## 7. Ver detalle de pedido

**Endpoint:** `GET /api/orders/:id`  
  

---

## 8. Cancelar pedido

**Endpoint:** `PUT /api/orders/:id/cancel`  
  

---
