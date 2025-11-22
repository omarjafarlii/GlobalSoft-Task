# ✈️ Hotel Booking Configuration Service: Frontend Implementation

Bu depo, mürəkkəb **çoxmərhələli konfiqurasiya** tələblərinə cavab verən dinamik hotel bronlaşdırma sisteminin ön cəbhə (frontend) hissəsini təmsil edən **Texniki Tapşırığın** (Technical Assessment) icrasıdır.

Layihənin əsas fokus nöqtələri **Təmiz Arxitektura**, **Proqnozlaşdırıla Bilən State İdarəetməsi** və **Biznes Məntiqinin Dəqiq İcrası** üzərində cəmləşmişdir.

---

## 💻 Texniki Stek və Qərar Əsaslandırması (Technical Stack & Justification)

| Kateqoriya | Texnologiya | Əsaslandırma (Strategic Justification) |
| :--- | :--- | :--- |
| **Framework** | **React.js** | Komponent əsaslı inkişaf üçün sənaye standartıdır. Tətbiqin dinamik UI və state dəyişikliklərini effektiv şəkildə idarə etməyə imkan verir. |
| **State M. (Global)** | **Redux Toolkit (RTK)** | **Həcmli və mərkəzləşdirilmiş state** (xüsusilə `dailyMealSelections` kimi nested data strukturları) idarə etmək üçün seçilmişdir. RTK, boilerplate-i azaldır və dəqiq **type inferring** (TypeScript) dəstəkləyir. |
| **Language** | **TypeScript** | Kodun keyfiyyətini və texniki borcunu azaltmaq üçün kritikdir. Proyektin miqyasının gələcəkdə böyümə ehtimalını nəzərə alaraq tətbiq edilmişdir. |
| **Styling** | **Tailwind CSS** | Development sürətini optimallaşdırmaq və **utility-first** yanaşması ilə responsiv dizaynı səmərəli şəkildə tətbiq etmək üçün istifadə edilmişdir. |
| **Routing** | **React Router DOM** | Üç addımlı konfiqurasiya prosesi arasında naviqasiyanın izolyasiyasını və idarəetməsini təmin edir. |

---

## 🏗️ Arxitektura Qərarları və İcrası (Architecture and Implementation Logic)

Layihə **Single Responsibility Principle (SRP)** əsasında **üç mərhələli, ardıcıl axın** üzərində qurulub. Bütün biznes məntiqi funksional komponentlər daxilində izolyasiya edilmişdir.

### Biznes Məntiqinin İcrası

* **HB Məhdudiyyəti (Mutually Exclusive):** `Step2Configuration` daxilindəki `isMealDisabled` funksiyası `Half Board` (HB) seçimi üçün **qarşılıqlı eksklüzivlik** qaydasını tətbiq edir. Bu, istifadəçinin bir gün üçün Nahar **VƏ YA** Şam yeməyindən yalnız birini seçə bilməsini təmin edir.
* **Dinamik Xərc Hesablanması:** `Step3Configuration` komponenti `calculateDailyCost` funksiyasından istifadə edərək, `tripDays` sayından asılı olaraq otel və yemək qiymətlərini toplayır və hər gün üçün detallı xərc cədvəlini təqdim edir.

### 🗺️ Tətbiq Marşrutlarının Detallı Axını

| Mərhələ | Komponent | Marşrut | Məsuliyyət Sahəsi |
| :--- | :--- | :--- | :--- |
| **1: Initialization** | `Step1Configuration.tsx` | `/` | **Səyahət Niyyətinin** müəyyən edilməsi (Təyinat, Müddət, Əsas Board Tipi). |
| **2: Daily Configuration** | `Step2Configuration.tsx` | `/meals` | **Otel təyinatı** və **Gündəlik Meal Planının** (HB/FB/NB məntiqinə uyğun) state-ə yazılması. |
| **3: Summary & Ledger** | `Step3Configuration.tsx` | `/summary` | Bütün seçimlərin auditi, təfərrüatlı gündəlik xərc cədvəlinin yaradılması və yekun **Grand Total** hesablanması. |

---

## 🚧 Məlum Məhdudiyyətlər və Gələcək Təkmilləşdirmələr

Bu, ilkin bir tətbiq (POC) olduğundan, istehsalata hazır bir həllə keçid üçün aşağıdakı təkmilləşdirmələr zəruridir:

### Məhdudiyyətlər (Known Limitations)

1.  **Statik Resurslar:** Bütün əsas məlumatlar (Hotels, Meals, Board Types) lokal TypeScript obyektləri kimi idarə olunur. Real həllər üçün bu məlumatlar **RESTful API** vasitəsilə alınmalıdır.
2.  **Validasiya və Nəzarət:** Naviqasiyanın otel seçilmədiyi təqdirdə bloklanması kimi fundamental səhv idarəetmə mövcuddur, lakin tarix aralığı və daha mürəkkəb forma yoxlamaları üçün tam yoxlama mexanizmi (məsələn, Zod ilə) yoxdur.

### Gələcək Təkmilləşdirmələr (Future Improvements)

* **Asinxron Məlumat Axını:** **Redux Toolkit Query (RTK Query)** istifadə edərək datanın keşlənməsi (caching), yüklənməsi və asinxron state-in daha səmərəli idarə edilməsi.
* **Unit Test Coverage:** Biznes məntiqinin bütün əsas yollarını (HB/NB məhdudiyyətləri və qiymət hesablanması) əhatə edən unit testlərin tətbiqi.
* **UX Təkmilləşdirilməsi:** Tətbiqin mobil cihazlarda yüksək keyfiyyətli işləməsini təmin etmək üçün **Adaptive Design** prinsiplərinin tətbiqi.

---

## 🚀 Yerli Quraşdırma (Local Setup)

Layihə **Vite** və **TypeScript** ilə qurulmuşdur. Yerli mühitdə işə salmaq üçün aşağıdakı addımları izləyin:

1.  **Deponu Klonlamaq:**
    ```bash
    git clone https://github.com/omarjafarlii/GlobalSoft-Task
    cd GlobalSoft-Task
    ```

2.  **Asılılıqları Quraşdırmaq:**
    ```bash
    npm install
    ```

3.  **Layihəni Başlatmaq:**
    ```bash
    npm run dev
    ```
    Tətbiq adətən **http://localhost:5173** ünvanında əlçatan olacaq.

---

## 🔗 Təqdimat Keçidləri (Submission Artifacts)

| Növ | Keçid (URL) |
| :--- | :--- |
| **GitHub Repository Link** | https://github.com/omarjafarlii/GlobalSoft-Task
| **Live Demo URL (Vercel/Netlify)** | https://global-soft-booking.vercel.app/ |
