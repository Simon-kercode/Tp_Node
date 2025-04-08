import {defineStore} from 'pinia';
import { useStore } from './store';
import { useAuthStore } from './authStore';
import axios from 'axios';

export const useOrderStore = defineStore("orders", {
    state: () => ({
        __ListOrders: [],

        // Définition des différents status des commandes
        __ListStatus: [
            {
                status: "En attente",
                color: "yellow",
            },
            {
                status: "Payé",
                color: "#2ecc71",
            },
            {
                status: "En cours de traitement",
                color: "blue"
            },
            {
                status: "Expédiée",
                color: "purple"
            },
            {
                status: "Livrée",
                color: "green"
            },
            {
                status: "Annulée",
                color: "red"
            }
        ],

        selectedOrder: null,

        editOrderModaleState: false,
        isEditingOrder: false,
        orderToEdit: null,

        cartContent: [],
        quantityInCart: 0,
    }),

    actions : {
        async getAllOrdersWithProducts() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/commandes/produits",
                    { 
                        withCredentials: true,
                    }
                );
                console.log(response)
                await this.setListOrders(response.data);
            }
            catch(error) {
                console.error(error)
            }
        },

        async setListOrders(orders) {
            this.__ListOrders = orders;
            console.log("Commandes : ", this.__ListOrders);
        },

        // Méthode d'enregistrement de commande
        async createOrder(order) {
            const store = useStore();
            try {
                const csrfToken = await store.getCsrfToken();

                const response = await axios.post("http://localhost:3000/commandes",
                    order,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRF-Token": csrfToken,
                    }   
                })
                if (response.status === 201 && response.data.order) {
                    store.sendSnackBar({
                        color: "success",
                        text: "Votre commande a bien été enregistrée. Merci ! Vous allez être redirigé vers l'accueil."
                    });
                    return true
                }
            } catch (error) {
                console.error("Erreur lors de la commande : ", error)
                store.sendSnackBar({
                    color: "error",
                    text: "Erreur lors de l'enregistrement de la commande. Merci de contacter le support."
                })
                return false
            }
        },

        async updateOrder(order) {
            const store = useStore();
            try{
                const csrfToken = await store.getCsrfToken();
                // Récupère l'id par "get" car product est un formData
                const response = await axios.put(`http://localhost:3000/commandes/${order.id}`, 
                    order,
                {
                    withCredentials: true,
                    headers: {
                        "X-CSRF-Token": csrfToken,
                    }
                });
                console.log(response.data.order);
                if (response.status === 200 && response.data.order) {
                    this.updateOrderInList(response.data.order[0]);
                    store.sendSnackBar({
                        color: "success",
                        text: "Commande mise à jour avec succès !"
                    })
                }
            } catch(error) {
                console.error("Erreur lors de la mise à jour de la commande : ", error.message);
                store.sendSnackBar({
                    color: "error",
                    text: "Erreur lors de la mise à jour de la commande !"
                });
            }
        },

        async deleteOrder(order) {
            const store = useStore();
            try {
                const csrfToken = await store.getCsrfToken();
                const response = await axios.delete(`http://localhost:3000/commandes/${order.id_commande}`,
                    {
                        withCredentials: true,
                        headers: {
                            "X-CSRF-Token": csrfToken
                        }
                    });
                    console.log(response);
                    if (response.status === 200) {
                        store.sendSnackBar({
                            color: "success",
                            text: "Commande supprimée avec succès !"
                        });
                        this.deleteOrderInList(order)
                    }
                    
            } catch (error) {
                console.error("Erreur lors de la suppression de la commande : ", error)
                store.sendSnackBar({
                    color: "error",
                    text: "Erreur lors de la suppression de la commande !"
                });
            }
        },

        updateOrderInList(updatedOrder) {
            const index = this.__ListOrders.findIndex(order => order.id_commande === updatedOrder.id_commande);

            if (index !== -1) {
                this.__ListOrders[index].statut = updatedOrder.statut
            }
        },
        addOrderInList(newOrder) {
            this.__ListOrders.push(newOrder);
        },

        deleteOrderInList(deletedOrder) {
            const index = this.__ListOrders.findIndex(order => order.id_commande === deletedOrder.id_commande);

            if (index !== -1) {
                this.__ListOrders.splice(index, 1);
            }
        },
        toggleEditOrderModale(order) {
            this.orderToEdit = order;
            this.editOrderModaleState = !this.editOrderModaleState;
        },

        getStatutColor(status) {
            const foundStatus = this.__ListStatus.find(item => item.status === status);

            return foundStatus ? foundStatus.color : 'gray';
        },

        /* méthode de chargement du panier dans le localstorage
         * Si la date actuelle est supérieure à la date d'expiration, on vide le panier.
         */
        async loadCart() {
            const authStore = useAuthStore();
            const savedCart = localStorage.getItem("cart");
            if (savedCart && savedCart.id_user === authStore.user.id) {
                const cartData = JSON.parse(savedCart);
                // Si le panier a expiré, on le vide
                if (Date.now() > cartData.expiry) {
                    localStorage.removeItem("cart");
                    this.cartContent = [];
                    this.quantityInCart = 0;
                } else {
                    this.cartContent = cartData.items;
                    this.quantityInCart = this.cartContent.reduce((sum, item) => sum + item.quantity, 0);
                }
            }
            else {
                this.cartContent = [];
                this.quantityInCart = 0;
            }
            console.log(this.cartContent)
          },

        /* Méthode d'enregistrement du panier dans le localstorage
         * On définit un temps d'expiration du panier de 24h
         */
        saveCart(id_user) {
            const cartData = {
                id_user: id_user,
                items: this.cartContent,
                expiry: Date.now() + 24 * 60 * 60 * 1000,
            };
            localStorage.setItem("cart", JSON.stringify(cartData)); 
        },

        deleteCart() {
            localStorage.removeItem("cart");
            this.cartContent = [];
            this.quantityInCart = 0;
        },

        /* Methode pour synchroniser le panier avec un utilisateur
         * Lorsqu'un utilisateur se connecte, on vérifie si un panier existe dans le localstorage
         * S'il s'agit d'un panier anonyme, on le lui attribue, sinon on le vide.
         */
        synchronizeCartWithUser(id_user) {
            const cart = JSON.parse(localStorage.getItem("cart"));
            if (cart) {
                if (!cart.id_user) {
                    cart.id_user = id_user;
                    localStorage.setItem("cart", JSON.stringify(cart));                            
                }
                else if (cart.id_user && cart.id_user !== id_user) {
                    this.deleteCart();
                }
            }
        },
        /* Méthode d'ajout au panier.
         * Vérifie si le produit existe déjà dans le panier. Si oui, incrémente la quantité
         * Si non, l'ajoute avec la quantité donnée.
         * Appelle la fonction de sauvegarde
         */
        addProductToCart(product,quantity) {
            const authStore = useAuthStore();
            const existingProduct = this.cartContent.find(item => item.id_produit === product.id_produit);
            if (existingProduct) {
                const initialQuantity = existingProduct.quantity;
                existingProduct.quantity += quantity;
                this.verifyProductInCart(product, initialQuantity, quantity);
            }
            else {
                this.cartContent.push({...product, quantity});
                this.verifyProductInCart(product, 0, quantity);
            }
            this.quantityInCart += quantity
            console.log(this.cartContent)
            this.saveCart(authStore.user?.id || null);
        },
        /* Méthode de déletion de produit du panier.
         * Décrémente de la quantité donnée
         * Supprime le produit si la quantité atteint 0
         * Appelles la fonction de sauvegarde
         */
        deleteProductToCart(product, quantity) {
            const authStore = useAuthStore();
            const index = this.cartContent.findIndex(item => item.id_produit === product.id_produit);
        
            if (index !== -1) {
                this.cartContent[index].quantity -= quantity;
                this.quantityInCart -= quantity;

                if (this.cartContent[index].quantity <= 0) {
                    this.cartContent.splice(index, 1);
                }
            }
            this.saveCart(authStore.user?.id || null);
        },

        // Méthode de vérification de l'ajout du produit au panier
        verifyProductInCart(product, initialQuantity, quantity) {
            const store = useStore();
            const verifiedProduct = this.cartContent.find(
                item => item.id_produit === product.id_produit && 
                item.quantity === (initialQuantity + quantity)
            );

            if (verifiedProduct) {
                store.sendSnackBar({
                    color: "success",
                    text: "Produit ajouté au panier."
                })
            } else {
                store.sendSnackBar({
                    color: "error",
                    text: "Echec de l'ajout au panier."
                })
            }
        },

        async loadUserOrders() {
            const store = useStore();
            const authStore = useAuthStore();
            try {
                const userId = authStore.user.id;
                const csrfToken = await store.getCsrfToken();
                const response = await axios.get(`http://localhost:3000/commandes/user/${userId}`,
                    {
                        withCredentials: true,
                        headers: {
                            "X-CSRF-Token": csrfToken
                        }
                    });
                    console.log(response);
                if (response && response.data) {
                    return response.data;
                }
                if (response.status === 404) {
                    return "Aucune commande dans votre historique."
                }
                    
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes de l'utilisateur : ", error)
            }
        }
    }
});