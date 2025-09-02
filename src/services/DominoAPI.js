class DominoAPI {
  baseUrl = "https://server.dominospizza.az/api/dominos";

  token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDlkNjQzZjJmZWVjYTQxMGE4YTBhZWMiLCJlbWFpbCI6ImFsaW1hbGl5ZXYwQGdtYWlsLmNvbSIsIm1vYmlsZSI6Ijc3MzE5OTM4NyIsInNlY3VyaXR5X2tleSI6IkBkMG0hbjAkLUB6M3JiQCFqQG4iLCJpYXQiOjE3NTUyNjk3ODJ9.0I6EBdlVCdK42PfuiI82yqkObMJzCC4cfewadAPxXfE";

  async getCustomMenu() {
    const res = await fetch(`${this.baseUrl}/custom`);
    const data = await res.json();
    return data;
  }

  async getMenuByType(type) {
    const validTypes = [
      "pizza",
      "bread",
      "chicken",
      "salad",
      "sides",
      "dessert",
      "drink",
    ];

    if (!validTypes.includes(type)) {
      throw new Error(`"${type}" tipi menyuda mövcud deyil`);
    }

    const res = await fetch(`${this.baseUrl}/menu/getbytype/web/${type}`);

    if (!res.ok) {
      throw new Error(
        `"${type}" menyusu alınmadı: ${res.status} - ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  }

  async getDoughOptions() {
    const res = await fetch(`${this.baseUrl}/dough/get`);
    if (!res.ok) throw new Error("Xəmir məlumatı alınmadı");
    const data = await res.json();
    return data;
  }

  async getCategories() {
    const res = await fetch(`${this.baseUrl}/categories`);
    const data = await res.json();
    return data;
  }

  async getStores() {
    const res = await fetch(`${this.baseUrl}/stores/public`);
    const data = await res.json();
    return data;
  }

  async getDealsActive(token) {
    const res = await fetch(`${this.baseUrl}/deals/active`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Verilənlər alınmadı");
    const data = await res.json();
    return data;
  }

  async getDealsActive(userId, token) {
    const res = await fetch(`${this.baseUrl}/deals/active/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`API xətası: ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  }

  async getDealById(dealId) {
    const res = await fetch(`${this.baseUrl}/deals/get/${dealId}`, {
      method: "GET",
      headers: {
        Authorization: this.token,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Deal məlumatı alınmadı: ${res.status} - ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  }
}

export default DominoAPI;
