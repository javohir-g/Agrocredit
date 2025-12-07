import requests
import time
import logging
from datetime import datetime

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# URLs для пинга
URLS = [
    "https://agroscore-app.onrender.com/",
    "https://agrocredit-api.onrender.com/"
]

# Интервал между запросами (в секундах)
# 14 минут = 840 секунд (Render.com усыпляет сервисы после 15 минут неактивности)
PING_INTERVAL = 840


def ping_url(url):
    """Отправляет GET запрос на указанный URL"""
    try:
        response = requests.get(url, timeout=30)
        if response.status_code == 200:
            logging.info(f"✓ {url} - OK (Status: {response.status_code})")
        else:
            logging.warning(f"⚠ {url} - Status: {response.status_code}")
        return True
    except requests.exceptions.Timeout:
        logging.error(f"✗ {url} - Timeout (30s)")
        return False
    except requests.exceptions.RequestException as e:
        logging.error(f"✗ {url} - Error: {str(e)}")
        return False


def keep_alive():
    """Основная функция для поддержания сервисов активными"""
    logging.info("=" * 60)
    logging.info("Keep-Alive скрипт запущен")
    logging.info(f"Интервал пинга: {PING_INTERVAL} секунд ({PING_INTERVAL // 60} минут)")
    logging.info(f"URLs для пинга: {len(URLS)}")
    for url in URLS:
        logging.info(f"  - {url}")
    logging.info("=" * 60)
    
    while True:
        try:
            logging.info(f"\n--- Начало цикла пинга ({datetime.now().strftime('%Y-%m-%d %H:%M:%S')}) ---")
            
            for url in URLS:
                ping_url(url)
                # Небольшая пауза между запросами к разным сервисам
                time.sleep(2)
            
            logging.info(f"--- Следующий пинг через {PING_INTERVAL // 60} минут ---\n")
            time.sleep(PING_INTERVAL)
            
        except KeyboardInterrupt:
            logging.info("\n\nСкрипт остановлен пользователем")
            break
        except Exception as e:
            logging.error(f"Неожиданная ошибка: {str(e)}")
            logging.info("Повтор через 60 секунд...")
            time.sleep(60)


if __name__ == "__main__":
    keep_alive()
