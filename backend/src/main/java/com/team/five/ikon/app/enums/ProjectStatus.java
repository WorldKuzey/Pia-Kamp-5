package com.team.five.ikon.app.enums;

public enum ProjectStatus {
    ACTIVE,       // Proje şu anda devam ediyor. Ekip projede aktif olarak çalışıyor.
    COMPLETED,    // Projenin tüm görevleri tamamlandı. Artık üzerinde aktif bir işlem yapılmıyor.
    CANCELLED,    //Proje başlatıldı ama bazı sebeplerden dolayı yarıda bırakıldı veya iptal edildi.
    ON_HOLD       // Proje geçici olarak durduruldu. Tamamen iptal edilmedi, ileride devam edilebilir.
}