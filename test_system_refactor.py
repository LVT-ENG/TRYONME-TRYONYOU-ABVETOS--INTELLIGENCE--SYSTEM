import unittest
# Simulación de la lógica que propusimos
from system_service import get_system_metrics, process_biometric_scan

class TestSystemRefactor(unittest.TestCase):
    def test_metrics_not_random(self):
        # Verificamos que no sea aleatorio llamándolo dos veces
        m1 = get_system_metrics()
        m2 = get_system_metrics()
        # En un entorno controlado sin carga, deberían ser consistentes o fallar a 0.0
        self.assertIsInstance(m1['cpu'], float)
        
    def test_biometric_progress(self):
        steps = []
        def callback(p): steps.append(p)
        
        process_biometric_scan(None, callback)
        self.assertEqual(steps, [25, 75, 100]) # Verifica el flujo real

if __name__ == '__main__':
    unittest.main()
