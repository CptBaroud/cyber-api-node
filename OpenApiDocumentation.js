module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Documentaion CesiMonPlat',
        version: '0.0.1',
        description:
            'Cette API sert de BackEnd aux différents front de la logique logicielle de CesiMonPlat',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'Gurvan Seveno',
            contactemail: 'gurvan.seveno@viacesi.fr',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Server de developpement',
        },
    ],
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'Id de l\'utilisateur dans la base de données',
                        example: 0
                    },
                    firstName: {
                        type: 'string',
                        description: 'Prénom de l\'utilisateur',
                        example: 'John'
                    },
                    lastName: {
                        type: 'string',
                        description: 'Nom de l\'utilisateur',
                        example: 'Doe'
                    },
                    address: {
                        type: 'string',
                        description: 'Adresse de l\'utilisateur',
                        example: '1 Boulevard de l\'Université, St-Nazaire'
                    },
                    referalCode: {
                        type: 'string',
                        description: 'Code de parrainage',
                        example: 'B159E439F357A197B73C27A7FD157FD0'
                    },
                    referalCount: {
                        type: 'integer',
                        description: 'Nombre de personnes parrainées',
                        example: 3
                    },
                    sponsor: {
                        type: 'integer',
                        description: 'Id de la personne qui a parrainé ce compte',
                        example: 0
                    },
                    active: {
                        type: 'integer',
                        description: 'Compte actif ou non',
                        example: 0
                    },
                    avatar: {
                        type: 'string',
                        description: 'URL de l\'avatar de l\'utilisateur',
                        example: 'http://localhost:3000/{userId}/{images}'
                    },
                    phone: {
                        type: 'string',
                        description: 'Numéro de téléphone de l\'utilisateur',
                        example: '0102030405'
                    },
                    email: {
                        type: 'string',
                        description: 'Email de l\'utilisateur',
                        example: 'john.doe@cmp.fr'
                    },
                    password: {
                        type: 'string',
                        description: 'Mot de passe de l\'utilisateur',
                        example: 'E0VDIwOjQwOjE5LjIwNVoiLCJpYXQiOjE2Mj'
                    },
                    role: {
                        type: 'integer',
                        description: 'Role de l\'utilisateur',
                        example: [
                            '0 - User de type client',
                            '1 - User de type livreur'
                        ]
                    }
                }
            },

            Users: {
                type: 'object',
                properties: {
                    users: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                }
            },

            Delivery: {
                type: 'object',
                properties: {
                    deliveryMan: {
                        type: 'number',
                        description: 'Id du livreur dans la base de données',
                        example: 0
                    },
                    client: {
                        type: 'number',
                        description: 'Id du client dans la base de données (utilisateur qui commande)',
                        example: 0
                    },
                    restaurant: {
                        type: 'object',
                        description: 'Référence du restaurant pour lequel la commande à été faite',
                        example: '507f1f77bcf86cd799439011'
                    },
                    address: {
                        type: 'string',
                        description: 'Adresse de livraison du client',
                        example: '1 Boulevard de l\'Université, 44600 Saint-Nazaire'
                    },
                    deliveryTime: {
                        type: 'date',
                        description: 'L\'heure à laquelle doit avoir lieu la livraison',
                        example: 'Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)'
                    },
                    created: {
                        type: 'date',
                        description: 'Date de la création de la livraison',
                        example: 'Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)'
                    },
                    end: {
                        type: 'date',
                        description: 'L\'heure à laquelle la livraison a eu lieu',
                        example: 'Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)'
                    },
                    done: {
                        type: 'boolean',
                        description: 'Statut de la livraison',
                        example: [
                            'false - La livraison n\'a pas été faite',
                            'true - La livraison a été faite'
                        ]
                    },
                    order: {
                        type: 'object',
                        description: 'Référence de la commande enregistrée pour cette livraison',
                        example: '507f1f77bcf86cd799439011'
                    },
                    status: {
                        type: 'Number',
                        description: 'Status/Etape de la livraison',
                        example: [
                            '0 - En attente d\'un livreur',
                            '1 - Le livreur accepte la commande',
                            '2 - Le restaurateur prépare la commande => UNUSED',
                            '3 - Le livreur recupère la commande',
                            '4 - Le livreur est en route => UNUSED',
                            '5 - Le livreur a livré la commande'
                        ]
                    },
                }
            },

            Article: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Nom de l\'article',
                        example: 'Bière'
                    },
                    description: {
                        type: 'string',
                        description: 'Description de l\'article',
                        example: 'Bière fraîche'
                    },
                    price: {
                        type: 'Number',
                        description: 'Prix de l\'article',
                        example: '3,20'
                    },
                    type: {
                        type: 'Number',
                        description: 'Type de l\'article : Boissons, Plats, Desserts, ...',
                        example: 1
                    },
                    ingredient: [{
                        type: 'string',
                        description: 'Ingrédients contenus dans l\'article',
                        example: 'Malt, houblon, levure, alcool'
                    }],
                    category: {
                        type: 'object',
                        description: 'Référence de la catégorie de l\'article',
                        example: '507f1f77bcf86cd799439011'
                    },
                    restaurant: {
                        type: 'object',
                        description: 'Référence du restaurant dans lequel il y a l\'article',
                        example: '507f1f77bcf86cd799439011'
                    }
                }
            },

            Category: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Nom de la catégorie',
                        example: 'Boissons Alcoolisées'
                    },
                    description: {
                        type: 'string',
                        description: 'Description de la catégorie',
                        example: 'Vous pouvez retrouver ici du vin, de la bière...'
                    },
                    type: {
                        type: 'number',
                        description: 'Type de la catégorie',
                        example: 0
                    },
                    restaurant: {
                        type: 'object',
                        description: 'Référence du restaurant dans lequel il y a l\'article',
                        example: '507f1f77bcf86cd799439011'
                    }
                }
            },

            Menu: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Nom du menu',
                        example: 'Menu enfant'
                    },
                    description: {
                        type: 'string',
                        description: 'Description du menu',
                        example: 'Menu équilibré pour enfant'
                    },
                    price: {
                        type: 'number',
                        description: 'Prix du menu',
                        example: '11,30'
                    },
                    category: {
                        type: 'object',
                        description: 'Référence de la catégorie du menu',
                        example: '507f1f77bcf86cd799439011'
                    },
                    article: {
                        type: 'object',
                        description: 'Référence de l\'article présent dans le menu',
                        example: '507f1f77bcf86cd799439011'
                    },
                    restaurant: {
                        type: 'object',
                        description: 'Référence du restaurant dans lequel il y a l\'article',
                        example: '507f1f77bcf86cd799439011'
                    }
                }
            },

            Notification: {
                type: 'object',
                properties: {
                    info: {
                        type: 'object',
                        description: 'Contient l\'icone de la notification',
                        example: '507f1f77bcf86cd799439011'
                    },
                    created: {
                        type: 'date',
                        description: 'Date de la création de la notification',
                        example: 'Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)'
                    },
                    user: {
                        type: 'number',
                        description: 'Utilisateur qui reçoit la notification',
                        example: 0
                    },
                    seen: {
                        type: 'boolean',
                        description: 'Statut de réception de la notification',
                        example: [
                            'false - La notification n\'a pas été vue',
                            'true - La notification a été vue'
                        ]
                    },
                    read: {
                        type: 'boolean',
                        description: 'Statut de lecture de la notification',
                        example: [
                            'false - La notification n\'a pas été lue',
                            'true - La notification a été lue'
                        ]
                    },
                    title: {
                        type: 'string',
                        description: 'Titre de la notification',
                        example: 'Votre commande arrive !!!'
                    },
                    to: {
                        type: 'string',
                        description: 'Page de la notification',
                        example: ''
                    }
                }
            },

            Order: {
                type: 'object',
                properties: {
                    user: {
                        type: 'number',
                        description: 'Utilisateur qui fait la commande',
                        example: 0
                    },
                    created: {
                        type: 'date',
                        description: 'Date de la création de la commande',
                        example: 'Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)'
                    },
                    restaurant: {
                        type: 'object',
                        description: 'Référence du restaurant pour lequel la commande a été faite',
                        example: '507f1f77bcf86cd799439011'
                    },
                    accepted: {
                        type: 'boolean',
                        description: 'Statut de la commande',
                        example: [
                            'false - Le restaurant n\'a pas accepté la commande',
                            'true - Le restaurant a accepté la commande'
                        ]
                    },
                    status: {
                        type: 'string',
                        description: 'Statut de la commande : en attente, acceptée, refusée',
                        example: 'Pending'
                    },
                    price: {
                        type: 'number',
                        description: 'Prix de la commande',
                        example: '12,5'
                    },
                    article: {
                        type: 'object',
                        description: 'Référence des items commandés',
                        example: '507f1f77bcf86cd799439011'
                    },
                    menu: {
                        type: 'object',
                        description: 'Référence du menu commandé',
                        example: '507f1f77bcf86cd799439011'
                    }
                }
            },

            Restaurant: {
                type: 'object',
                properties: {
                    user: {
                        type: 'number',
                        description: 'Utilisateur qui gère le compte du restaurant',
                        example: 0
                    },
                    name: {
                        type: 'string',
                        description: 'Nom du restaurant',
                        example: 'Burger King'
                    },
                    description: {
                        type: 'string',
                        description: 'Description du restaurant',
                        example: 'Fast Food'
                    },
                    logo: {
                        type: 'string',
                        description: 'Logo du restaurant',
                        example: ''
                    },
                    type: {
                        type: 'string',
                        description: 'Type du restaurant',
                        example: 'Fast Food'
                    },
                    menu: {
                        type: 'object',
                        description: 'Référence du menu proposé dans le restaurant',
                        example: '507f1f77bcf86cd799439011'
                    },
                    article: {
                        type: 'object',
                        description: 'Référence de l\'article proposé dans le restaurant',
                        example: '507f1f77bcf86cd799439011'
                    },
                    categories: {
                        type: 'object',
                        description: 'Référence de la catégorie proposée dans le restaurant',
                        example: '507f1f77bcf86cd799439011'
                    }
                }
            },

            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    internal_code: {
                        type: 'string'
                    }
                }
            }
        }/*,
        securitySchemes: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-api-key'
            }
        }*/
    },
    paths: {
        '/users': {
            get: {
                tags: ['CRUD operations'],
                description: 'Get users',
                operationId: 'getUsers',
                responses: {
                    '200': {
                        description: 'Users were obtained',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['CRUD operations'],
                description: 'Add a user',
                operationId: 'addUser',
                parameters: [{
                    name: 'firstName',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'First name of the user',
                    example: 'John'
                },
                {
                    name: 'lastName',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Last name of the user',
                    example: 'Doe'
                },
                {
                    name: 'referalCode',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Referral Code',
                    example: 'B159E439F357A197B73C27A7FD157FD0'
                },
                {
                    name: 'referalCount',
                    in: "query",
                    type: 'integer',
                    required: true,
                    description: 'number of people sponsored',
                    example: 2
                },
                {
                    name: 'sponsor',
                    in: "query",
                    type: 'integer',
                    required: true,
                    description: 'Id of the person who sponsored this account',
                    example: 0
                },
                {
                    name: 'email',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Email of the user',
                    example: 'johndoe@gmail.com'
                },
                {
                    name: 'password',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Password of the user',
                    example: '123'
                },
                {
                    name: 'role',
                    in: "query",
                    type: 'integer',
                    required: true,
                    description: 'Role of the user',
                    example: 0
                },
                {
                    name: 'address',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'User address',
                    example: '1 rue du Ménil'
                }],
                responses: {
                    '200': {
                        description: 'User has been created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/users/getUser': {
            get: {
                tags: ['CRUD operations'],
                description: 'Get users for Nuxt',
                operationId: 'getUsersForNuxt',
                responses: {
                    '200': {
                        description: 'Route used for Nuxt',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },
        
        '/users/{userId}': {
            get: {
                tags: ['CRUD operations'],
                description: 'Get a user',
                operationId: 'getUser',
                parameters: [{
                    name: 'userId',
                    in: "path",
                    type: 'number',
                    required: true,
                    description: 'Id of a specific user',
                    example: 1
                }],
                responses: {
                    '200': {
                        description: 'The requested user',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['CRUD operations'],
                description: 'Edit a user',
                operationId: 'editUser',
                parameters: [{
                    name: 'userId',
                    in: "path",
                    type: 'number',
                    required: true,
                    description: 'Id of a specific user',
                    example: 1
                },
                {
                    name: 'firstName',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'First name of the user',
                    example: 'John'
                },
                {
                    name: 'lastName',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Last name of the user',
                    example: 'Doe'
                },
                {
                    name: 'email',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Email of the user',
                    example: 'johndoe@gmail.com'
                },
                {
                    name: 'password',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Password of the user',
                    example: '123'
                },
                {
                    name: 'role',
                    in: "query",
                    type: 'integer',
                    required: true,
                    description: 'Role of the user',
                    example: 0
                },
                {
                    name: 'admin',
                    in: "query",
                    type: 'integer',
                    required: true,
                    description: 'If an user is an admin or not',
                    example: 0
                }],
                responses: {
                    '200': {
                        description: 'Edit the requested user',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['CRUD operations'],
                description: 'Delete a user',
                operationId: 'deleteUser',
                parameters: [{
                    name: 'userId',
                    in: "path",
                    type: 'number',
                    required: true,
                    description: 'Id of a specific user',
                    example: 1
                }],
                responses: {
                    '200': {
                        description: 'Delete the requested user',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
        },

        '/users/avatar/{userId}': {
            put: {
                tags: ['CRUD operations'],
                description: 'Add an avatar for a user',
                operationId: 'addAvatar',
                parameters: [{
                    name: 'userId',
                    in: "path",
                    type: 'number',
                    required: true,
                    description: 'Id of a specific user',
                    example: 1
                },
                {
                    name: 'avatar',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'URL de l\'avatar de l\'utilisateur',
                    example: 'http://localhost:3000/{userId}/{images}'
                }],
                responses: {
                    '200': {
                        description: 'The avatar has been added',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/users/block/{userId}': {
            put: {
                tags: ['CRUD operations'],
                description: 'Block user',
                operationId: 'blockAvatar',
                parameters: [{
                    name: 'userId',
                    in: "path",
                    type: 'number',
                    required: true,
                    description: 'Id of a specific user',
                    example: 1
                }],
                responses: {
                    '200': {
                        description: 'User has been blocked',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/users/unblock/{userId}': {
            put: {
                tags: ['CRUD operations'],
                description: 'Unblock user',
                operationId: 'unblockUser',
                parameters: [{
                    name: 'userId',
                    in: "path",
                    type: 'number',
                    required: true,
                    description: 'Id of a specific user',
                    example: 1
                }],
                responses: {
                    '200': {
                        description: 'User has been unblocked',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/users/restaurant': {
            post: {
                tags: ['CRUD operations'],
                description: 'Unblock user',
                operationId: 'unblockUser',
                parameters: [{
                    name: 'firstName',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'First name of the user',
                    example: 'John'
                },
                {
                    name: 'lastName',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Last name of the user',
                    example: 'Doe'
                },
                {
                    name: 'referalCode',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Referral Code',
                    example: 'B159E439F357A197B73C27A7FD157FD0'
                },
                {
                    name: 'referalCount',
                    in: "query",
                    type: 'integer',
                    required: true,
                    description: 'number of people sponsored',
                    example: 2
                },
                {
                    name: 'sponsor',
                    in: "query",
                    type: 'integer',
                    required: true,
                    description: 'Id of the person who sponsored this account',
                    example: 0
                },
                {
                    name: 'email',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Email of the user',
                    example: 'johndoe@gmail.com'
                },
                {
                    name: 'password',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Password of the user',
                    example: '123'
                },
                {
                    name: 'role',
                    in: "query",
                    type: 'integer',
                    required: true,
                    description: 'Role of the user',
                    example: 0
                },
                {
                    name: 'address',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'User address',
                    example: '1 rue du Ménil'
                }],
                responses: {
                    '200': {
                        description: 'User has been unblocked',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/users/getRestaurantUser': {
            get: {
                tags: ['CRUD operations'],
                description: 'Retrieve user and restaurant information',
                operationId: 'getRestaurantUser',
                responses: {
                    '200': {
                        description: 'Retrieve user and restaurant information',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/delivery': {
            post: {
                tags: ['CRUD operations'],
                description: 'Add a delivery',
                operationId: 'addDelivery',
                parameters: [{
                    name: 'deliveryMan',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Id of thedelivery man',
                    example: 0
                },
                {
                    name: 'client',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Id of the client',
                    example: 0
                },
                {
                    name: 'restaurant',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant for which the delivery was requested',
                    example: '60c775d544cb90379cce13f2'
                },
                {
                    name: 'address',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Address of the delivery',
                    example: '1 Boulevard de l\'Université'
                },
                {
                    name: 'deliveryTime',
                    in: "query",
                    type: 'date',
                    required: true,
                    description: 'The date the delivery was requested',
                    example: 'Sun Dec 17 1995 03:24:00 GMT'
                },
                {
                    name: 'order',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Id of the order',
                    example: '60c775d544cb90379cce13f2'
                }],
                responses: {
                    '200': {
                        description: 'Creation of a delivery',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Delivery'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            get: {
                tags: ['CRUD operations'],
                description: 'Get deliveries',
                operationId: 'getDeliveries',
                responses: {
                    '200': {
                        description: 'Get deliveries',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Delivery'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/delivery/close': {
            put: {
                tags: ['CRUD operations'],
                description: 'Close a delivery',
                operationId: 'closeDelivery',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of a delivery',
                    example: '60cafedf3a26451e640f65a7'
                }],
                responses: {
                    '200': {
                        description: 'Close a delivery',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Delivery'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/delivery/open': {
            put: {
                tags: ['CRUD operations'],
                description: 'A delivery person takes charge of the order',
                operationId: 'openDelivery',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of a delivery',
                    example: '60cafedf3a26451e640f65a7'
                },
                {
                    name: 'deliveryMan',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Id of a delivery man',
                    example: 1
                }],
                responses: {
                    '200': {
                        description: 'A delivery person takes charge of the order',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Delivery'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/delivery/taken': {
            put: {
                tags: ['CRUD operations'],
                description: 'The delivery man picked up the order',
                operationId: 'takenDelivery',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of a delivery',
                    example: '60cafedf3a26451e640f65a7'
                }],
                responses: {
                    '200': {
                        description: 'The delivery man picked up the order',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Delivery'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/delivery/{deliveryId}': {
            delete: {
                tags: ['CRUD operations'],
                description: 'Delete a delivery',
                operationId: 'deleteDelivery',
                parameters: [{
                    name: 'deliveryId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Reference of a delivery',
                    example: '60cafedf3a26451e640f65a7'
                }],
                responses: {
                    '200': {
                        description: 'Delete a delivery',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Delivery'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/delivery/{userId}': {
            get: {
                tags: ['CRUD operations'],
                description: 'Delivery requested by a specific user',
                operationId: 'userDelivery',
                parameters: [{
                    name: 'deliveryId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Reference of a delivery',
                    example: '60cafedf3a26451e640f65a7'
                }],
                responses: {
                    '200': {
                        description: 'Delivery requested by a specific user',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Delivery'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/auth': {
            post: {
                tags: ['CRUD operations'],
                description: 'Get a token',
                operationId: 'getToken',
                parameters: [{
                    name: 'email',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Email of an user',
                    example: 'johndoe@gmail.com'
                },
                {
                    name: 'password',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Password of an user',
                    example: '123'
                }],
                responses: {
                    '200': {
                        description: 'Get a token',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Users',
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing or invalid',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },
        
        '/menu': {
            get: {
                tags: ['CRUD operations'],
                description: 'Get a menu',
                operationId: 'getMenu',
                responses: {
                    '200': {
                        description: 'Get a menu',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Menu'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['CRUD operations'],
                description: 'Add a menu',
                operationId: 'addMenu',
                parameters: [{
                    name: 'name',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Name for the menu',
                    example: 'Children\'s menu'
                },
                {
                    name: 'description',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Description for the menu',
                    example: 'Balanced menu for children'
                },
                {
                    name: 'price',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Price for the menu',
                    example: '13,40'
                },
                {
                    name: 'category',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of a category for the menu',
                    example: [
                        '60cafedf3a26451e640f65a7',
                        '507f1f77bcf86cd799439011'
                    ]           
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Reference of article in the menu',
                    example: 'Balanced menu for children'
                }],
                responses: {
                    '200': {
                        description: 'Add a menu',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Menu'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing or invalid',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['CRUD operations'],
                description: 'Edit a menu',
                operationId: 'editMenu',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference for the menu',
                    example: '60cb6339e452d94908d85fc6'
                },
                {
                    name: 'name',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Name for the menu',
                    example: 'Children\'s menu'
                },
                {
                    name: 'description',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Description for the menu',
                    example: 'Balanced menu for children'
                },
                {
                    name: 'price',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Price for the menu',
                    example: '13,40'
                },
                {
                    name: 'category',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of a category for the menu',
                    example: [
                        '60cafedf3a26451e640f65a7',
                        '507f1f77bcf86cd799439011'
                    ]           
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Reference of article in the menu',
                    example: 'Balanced menu for children'
                }],
                responses: {
                    '200': {
                        description: 'Edit a menu',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Menu'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing or invalid',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/menu/{menuId}': {
            delete: {
                tags: ['CRUD operations'],
                description: 'Delete a menu',
                operationId: 'deleteMenu',
                parameters: [{
                    name: 'menuId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Id of a specific menu',
                    example: '60cb6339e452d94908d85fc6'
                }],
                responses: {
                    '200': {
                        description: 'Delete a menu',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Menu'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/menu/article/push': {
            put: {
                tags: ['CRUD operations'],
                description: 'Add an article in a menu',
                operationId: 'addArticleInMenu',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the menu',
                    example: '60cb6339e452d94908d85fc6'
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'Add an article in a menu',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Menu'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/menu/article/pull': {
            put: {
                tags: ['CRUD operations'],
                description: 'Remove an article from a menu',
                operationId: 'removeArticleFromAMenu',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the menu',
                    example: '60cb6339e452d94908d85fc6'
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'Remove article from the menu',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Menu'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/menu/{restaurantId}': {
            get: {
                tags: ['CRUD operations'],
                description: 'Display menus for a specific restaurant',
                operationId: 'displayMenusRestaurants',
                parameters: [{
                    name: 'restaurantId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Id of a specific menu',
                    example: '60cb6339e452d94908d85fc6'
                }],
                responses: {
                    '200': {
                        description: 'Display menus for a specific restaurant',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Menu'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/article': {
            get: {
                tags: ['CRUD operations'],
                description: 'Get articles',
                operationId: 'getArticles',
                responses: {
                    '200': {
                        description: 'Get articles',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Article'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['CRUD operations'],
                description: 'Add an article',
                operationId: 'addArticle',
                parameters: [{
                    name: 'name',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Name of the article',
                    example: 'Beer'
                },
                {
                    name: 'description',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Description of the article',
                    example: 'Cold beer'
                },
                {
                    name: 'price',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Price of the article',
                    example: '3,50'
                },
                {
                    name: 'type',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Article type: Drinks, Dishes, Desserts, ...',
                    example: 1
                },
                {
                    name: 'ingredient',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Ingredient for the article',
                    example: [
                        'Malt', 
                        'Hops', 
                        'Yeast', 
                        'Alcohol'
                    ]
                },
                {
                    name: 'category',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the category for the article',
                    example: '60cb62df71756147a0e4137a'
                },
                {
                    name: 'restaurant',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant for the article',
                    example: '60cb62df71756147a0e4137a'
                }],
                responses: {
                    '200': {
                        description: 'Add an article',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Article'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['CRUD operations'],
                description: 'Edit an article',
                operationId: 'editArticle',
                parameters: [{
                    name: 'name',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Name of the article',
                    example: 'Beer'
                },
                {
                    name: 'description',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Description of the article',
                    example: 'Cold beer'
                },
                {
                    name: 'price',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Price of the article',
                    example: '3,50'
                },
                {
                    name: 'type',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Article type: Drinks, Dishes, Desserts, ...',
                    example: 1
                },
                {
                    name: 'ingredient',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Ingredient for the article',
                    example: [
                        'Malt', 
                        'Hops', 
                        'Yeast', 
                        'Alcohol'
                    ]
                },
                {
                    name: 'category',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the category for the article',
                    example: '60cb62df71756147a0e4137a'
                },
                {
                    name: 'restaurant',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant for the article',
                    example: '60cb62df71756147a0e4137a'
                }],
                responses: {
                    '200': {
                        description: 'Edit an article',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Article'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/article/ingredient/pull': {
            put: {
                tags: ['CRUD operations'],
                description: 'Remove an ingredient in an article',
                operationId: 'removeIngredient',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'ingredient',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Name of the ingredient for an article',
                    example: 'Malt'
                }],
                responses: {
                    '200': {
                        description: 'Remove ingredient',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Article'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/article/ingredient/push': {
            put: {
                tags: ['CRUD operations'],
                description: 'Add an ingredient in an article',
                operationId: 'addIngredient',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'ingredient',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Name of the ingredient for an article',
                    example: 'Malt'
                }],
                responses: {
                    '200': {
                        description: 'Add ingredient',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Article'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/article/{articleId}': {
            delete: {
                tags: ['CRUD operations'],
                description: 'Remove a specific article',
                operationId: 'removeArticle',
                parameters: [{
                    name: 'articleId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'The article has been deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Article'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/article/{restaurantId}': {
            get: {
                tags: ['CRUD operations'],
                description: 'View articles from a specific restaurant',
                operationId: 'viewArticles',
                parameters: [{
                    name: 'restaurantId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'View articles from a specific restaurant',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Article'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/notification/{userId}': {
            get: {
                tags: ['CRUD operations'],
                description: 'Retrieve notifications from a specific user',
                operationId: 'retrieveNotifications',
                parameters: [{
                    name: '_id',
                    in: "path",
                    type: 'number',
                    required: true,
                    description: 'Reference of the user',
                    example: 0
                }],
                responses: {
                    '200': {
                        description: 'Retrieve notifications from a specific user',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Notification'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/notification/': {
            post: {
                tags: ['CRUD operations'],
                description: 'Retrieve notifications',
                operationId: 'retrieveNotifications',
                parameters: [{
                    name: 'info',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Contains notification icon',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'title',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Notification title',
                    example: 'Your delivery is coming !!'
                },
                {
                    name: 'to',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Notification page',
                    example: ''
                },
                {
                    name: 'user',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'User id',
                    example: 0
                }],
                responses: {
                    '200': {
                        description: 'Retrieve notifications',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Notification'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['CRUD operations'],
                description: 'Remove notifications',
                operationId: 'retrieveNotifications',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Notification id',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'Remove notifications',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Notification'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/notification/seen': {
            put: {
                tags: ['CRUD operations'],
                description: 'Notification has been received',
                operationId: 'notificationReceived',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Notification id',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'Notification has been received',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Notification'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/notification/read': {
            put: {
                tags: ['CRUD operations'],
                description: 'Notification has been read',
                operationId: 'notificationRead',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Notification id',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'Notification has been read',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Notification'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/order': {
            get: {
                tags: ['CRUD operations'],
                description: 'Show orders',
                operationId: 'showOrders',
                responses: {
                    '200': {
                        description: 'Show orders',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['CRUD operations'],
                description: 'Create an order',
                operationId: 'createOrder',
                parameters: [{
                    name: 'user',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'User id',
                    example: 0
                },
                {
                    name: 'menu',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of a menu',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of an article',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'price',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Price of the order',
                    example: 15.3
                },
                {
                    name: 'restaurant',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '507f1f77bcf86cd799439011'
                }],
                responses: {
                    '200': {
                        description: 'Create an order',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['CRUD operations'],
                description: 'Edit order',
                operationId: 'editOrder',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Order id',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'user',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'User id',
                    example: 0
                },
                {
                    name: 'menu',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of a menu',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of an article',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'price',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Price of the order',
                    example: 15.3
                },
                {
                    name: 'restaurant',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '507f1f77bcf86cd799439011'
                }],
                responses: {
                    '200': {
                        description: 'Edit an order',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/order/accept': {
            put: {
                tags: ['CRUD operations'],
                description: 'Change order status to accept',
                operationId: 'acceptOrder',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the order',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'Change order status to accept',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/order/decline': {
            put: {
                tags: ['CRUD operations'],
                description: 'Change order status to decline',
                operationId: 'declineOrder',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the order',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'Change order status to decline',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/order/article/push': {
            put: {
                tags: ['CRUD operations'],
                description: 'Add an article in an order',
                operationId: 'addArticle',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the order',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'The article has been added',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/order/{orderId}': {
            delete: {
                tags: ['CRUD operations'],
                description: 'Delete an order',
                operationId: 'deleteOrder',
                parameters: [{
                    name: 'orderId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Order id',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'Delete an order',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/order/{userId}': {
            get: {
                tags: ['CRUD operations'],
                description: 'View orders made by a specific user',
                operationId: 'viewOrdersUser',
                parameters: [{
                    name: 'userId',
                    in: "path",
                    type: 'number',
                    required: true,
                    description: 'User id',
                    example: 1
                }],
                responses: {
                    '200': {
                        description: 'View orders made by a specific user',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/order/{restaurantId}': {
            get: {
                tags: ['CRUD operations'],
                description: 'View orders made for a specific restaurant',
                operationId: 'viewOrdersRestaurant',
                parameters: [{
                    name: 'restaurantId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Restaurant id',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'View orders made for a specific restaurant',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/order/article/pull': {
            put: {
                tags: ['CRUD operations'],
                description: 'Remove an article in an order',
                operationId: 'removeArticle',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the order',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'The article has been deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/order/menu/push': {
            put: {
                tags: ['CRUD operations'],
                description: 'Add a menu in an order',
                operationId: 'addArticle',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the order',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'menu',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the menu',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'The menu has been added',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/order/menu/pull': {
            put: {
                tags: ['CRUD operations'],
                description: 'Remove a menu in an order',
                operationId: 'removeArticle',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the order',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'menu',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the menu',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'The menu has been deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/category': {
            get: {
                tags: ['CRUD operations'],
                description: 'Show categories',
                operationId: 'showCategories',
                responses: {
                    '200': {
                        description: 'Show categories',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Category'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['CRUD operations'],
                description: 'Create a category',
                operationId: 'createCategory',
                parameters: [{
                    name: 'name',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Name of the category',
                    example: 'Drink'
                },
                {
                    name: 'description',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Description of the category',
                    example: 'Cold or hot drinks, carbonated, alcoholic or non-alcoholic'
                },
                {
                    name: 'type',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Id of the category',
                    example: 0
                },
                {
                    name: 'restaurant',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '507f1f77bcf86cd799439011'
                }],
                responses: {
                    '200': {
                        description: 'The category has been created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Category'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['CRUD operations'],
                description: 'Edit a category',
                operationId: 'removeArticle',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the category',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'name',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Name of the category',
                    example: 'Drink'
                },
                {
                    name: 'description',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Description of the category',
                    example: 'Cold or hot drinks, carbonated, alcoholic or non-alcoholic'
                },
                {
                    name: 'type',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Id of the category',
                    example: 0
                },
                {
                    name: 'restaurant',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '507f1f77bcf86cd799439011'
                }],
                responses: {
                    '200': {
                        description: 'Show categories',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Category'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
        },

        '/category/{categoryId}': {
            delete: {
                tags: ['CRUD operations'],
                description: 'Remove a category',
                operationId: 'removeCategory',
                parameters: [{
                    name: 'categoryId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Reference of the category',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'The menu has been deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Category'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/category/type/{typeId}': {
            get: {
                tags: ['CRUD operations'],
                description: 'Retrieve a particular type of category',
                operationId: 'retrieveTypeCategory',
                parameters: [{
                    name: 'typeId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Reference of the type for a category',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'Retrieve a particular type of category',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Category'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/category/restaurant/{restaurantId}': {
            get: {
                tags: ['CRUD operations'],
                description: 'Retrieve a particular category restaurant',
                operationId: 'retrieveRestaurantCategory',
                parameters: [{
                    name: 'restaurantId',
                    in: "path",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant for a category',
                    example: '60cb68e51e2f573d1c86a53e'
                }],
                responses: {
                    '200': {
                        description: 'Retrieve a particular category restaurant',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Category'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/restaurant': {
            get: {
                tags: ['CRUD operations'],
                description: 'Show restaurants',
                operationId: 'showRestaurants',
                responses: {
                    '200': {
                        description: 'Show restaurants',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['CRUD operations'],
                description: 'Create a restaurant',
                operationId: 'createRestaurant',
                parameters: [{
                    name: 'name',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Name of the restaurant',
                    example: 'Burger King'
                },
                {
                    name: 'description',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Description of the restaurant',
                    example: 'Fast Food'
                },
                {
                    name: 'user',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Id of the user',
                    example: 0
                },
                {
                    name: 'menu',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the menu',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'categories',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the category',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'type',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Type of the restaurant',
                    example: 'Fast Food'
                },
                {
                    name: 'logo',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Logo of the restaurant',
                    example: ''
                }],
                responses: {
                    '200': {
                        description: 'The Restaurant has been created',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['CRUD operations'],
                description: 'Edit a restaurant',
                operationId: 'editRestaurant',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'name',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Name of the restaurant',
                    example: 'Burger King'
                },
                {
                    name: 'description',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Description of the restaurant',
                    example: 'Fast Food'
                },
                {
                    name: 'user',
                    in: "query",
                    type: 'number',
                    required: true,
                    description: 'Id of the user',
                    example: 0
                },
                {
                    name: 'menu',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the menu',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'categories',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the category',
                    example: '507f1f77bcf86cd799439011'
                },
                {
                    name: 'type',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Type of the restaurant',
                    example: 'Fast Food'
                },
                {
                    name: 'logo',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Logo of the restaurant',
                    example: ''
                }],
                responses: {
                    '200': {
                        description: 'Edit restaurant',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['CRUD operations'],
                description: 'Remove a restaurant',
                operationId: 'removeRestaurant',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '507f1f77bcf86cd799439011'
                }],
                responses: {
                    '200': {
                        description: 'Remove a restaurant',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/restaurant/article/push': {
            put: {
                tags: ['CRUD operations'],
                description: 'Add an article in a restaurant',
                operationId: 'addArticleInRestaurant',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'The article has been added',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/restaurant/menu/push': {
            put: {
                tags: ['CRUD operations'],
                description: 'Add a menu in a restaurant',
                operationId: 'addMenuInRestaurant',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'menu',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the menu',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'The menu has been added',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/restaurant/category/push': {
            put: {
                tags: ['CRUD operations'],
                description: 'Add a category in a restaurant',
                operationId: 'addCategoryInRestaurant',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'category',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the category',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'The category has been added',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/restaurant/article/pull': {
            put: {
                tags: ['CRUD operations'],
                description: 'Remove an article in a restaurant',
                operationId: 'removeArticle',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'article',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the article',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'The article has been deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/restaurant/menu/pull': {
            put: {
                tags: ['CRUD operations'],
                description: 'Remove a menu in a restaurant',
                operationId: 'removeMenu',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'menu',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the menu',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'The menu has been deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/restaurant/category/pull': {
            put: {
                tags: ['CRUD operations'],
                description: 'Remove a category in a restaurant',
                operationId: 'removeCategory',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'category',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the category',
                    example: '60cafedf3a26451e640f65a8'
                }],
                responses: {
                    '200': {
                        description: 'The category has been deleted',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/restaurant/logo': {
            put: {
                tags: ['CRUD operations'],
                description: 'Change the restaurant logo',
                operationId: 'changeRestaurantLogo',
                parameters: [{
                    name: '_id',
                    in: "query",
                    type: 'object',
                    required: true,
                    description: 'Reference of the restaurant',
                    example: '60cb68e51e2f573d1c86a53e'
                },
                {
                    name: 'logo',
                    in: "query",
                    type: 'string',
                    required: true,
                    description: 'Restaurant logo',
                    example: ''
                }],
                responses: {
                    '200': {
                        description: 'Change the restaurant logo',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Restaurant'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing parameters',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                },
                                example: {
                                    message: 'parameter is missing',
                                    internal_code: 'missing_parameters'
                                }
                            }
                        }
                    }
                }
            }
        },

    }
};
