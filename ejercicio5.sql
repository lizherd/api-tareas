-- Ejercicio 5
-- Libros que la alumna Sonia tiene prestados, no ha devueltoy está al 30/07/2021

SELECT 
  l.nombre AS libro,
  p.fecha_prestamo,
  l.dias_limite_prestamo
FROM prestamo p
INNER JOIN alumno a ON a.id = p.id_alumno
INNER JOIN libro l ON l.id = p.id_libro
WHERE a.nombres = 'Sonia'
  AND p.entregado = false
  AND DATE_ADD(p.fecha_prestamo, INTERVAL l.dias_limite_prestamo DAY) < '2021-07-30';
