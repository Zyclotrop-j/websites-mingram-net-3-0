import fs from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { Configuration, OpenAIApi } from 'openai';

const __dirname = dirname(fileURLToPath(import.meta.url));

const trimLines = str => str.split('\n').map(i => i.trim()).join('\n');

const configuration = new Configuration({
  apiKey: `${fs.readFileSync(join(__dirname, '../../env/openai.txt'))}`.trim(),
});
const openai = new OpenAIApi(configuration);

export default function startSignalingServer(app) {
    app.post('/ai/product', {
        schema: {
            headers: {
                'Content-Type': {
                    const: 'application/json'
                }
            },
            request: {
                body: {
                    description: 'Write product copy',
                    type: 'object',
                    required: ['style', 'targetaudience', 'description'],
                    properties: {
                        style: { enum: [
                            'creative ad',
                            'short description'
                        ] }, 
                        targetaudience: { enum: [
                            'parents',
                            'adults',
                            'the lederly',
                            'the youth',
                            'the general public',
                            'the rich',
                            'the poor'
                        ] }, 
                        description: { type: 'string', minLength: '60', maxLength: '300' },
                        model: { default: "davinci", enum: [
                            'davinci',
                            'curie',
                            'babbage',
                            'ada'
                        ] }
                    }
                }
            },
            response: {
                200: {
                    description: 'Product copy suggestions',
                    type: 'object',
                    properties: {
                        choices: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    text: { type: 'string' }, 
                                    index: { type: 'integer' }, 
                                    finish_reason: { type: 'string' }, 
                                }
                            }
                        },
                    }
                }
            }
        },
        handler: async function (request, reply) {
            const modelToModel = {
                'davinci': 'text-davinci-003',
                'curie': 'text-curie-001',
                'babbage': 'text-babbage-001',
                'ada': 'text-ada-001',
            }
            const body = request.body;
            // todo: auth and limits
            try {
                const moderationdata = await openai.createModeration({
                    input:  `${body.description}`
                });
                console.log(moderationdata.data);
                if(moderationdata.data.results.some(i => i.flagged)) {
                    return reply.status(400).send({
                        error: true,
                        reason: 'Content Moderation',
                        details: `Invalid prompt: ${moderationdata.data.results.flatMap(
                            r => Object.entries(r.categories).filter(([k, v]) => v).map(([k]) => k)
                        )}`,
                    });
                }

                const settings = {
                    temperature: 0.5,
                    max_tokens: 100,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                };
                const prompt = trimLines(`Write a ${body.style} for the following product aimed at ${body.targetaudience}:
                        
                Product: ${body.description}`);
                
                const completion = await openai.createCompletion({
                    ...settings,
                    model: modelToModel[body.model || 'davinci'] || modelToModel.ada,
                    prompt: prompt,
                  });
                console.log(completion.data);
                return reply.send(completion.data);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    console.log(error.message);
                }
                throw error;
            }
        }
    });

    app.post('/ai/extend', {
        schema: {
            headers: {
                'Content-Type': {
                    const: 'application/json'
                }
            },
            request: {
                body: {
                    description: 'Extend on existing text',
                    type: 'object',
                    required: ['description'],
                    properties: {
                        description: { type: 'string', minLength: '60', maxLength: '300' },
                        model: { default: "davinci", enum: [
                            'davinci',
                            'curie',
                            'babbage',
                            'ada'
                        ] }
                    }
                }
            },
            response: {
                200: {
                    description: 'Extended copy',
                    type: 'object',
                    properties: {
                        choices: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    text: { type: 'string' }, 
                                    index: { type: 'integer' }, 
                                    finish_reason: { type: 'string' }, 
                                }
                            }
                        },
                    }
                }
            }
        },
        handler: async function (request, reply) {
            const modelToModel = {
                'davinci': 'text-davinci-003',
                'curie': 'text-curie-001',
                'babbage': 'text-babbage-001',
                'ada': 'text-ada-001',
            }
            const body = request.body;
            // todo: auth and limits
            try {
                const moderationdata = await openai.createModeration({
                    input:  `${body.description}`
                });
                console.log(moderationdata.data);
                if(moderationdata.data.results.some(i => i.flagged)) {
                    return reply.status(400).send({
                        error: true,
                        reason: 'Content Moderation',
                        details: `Invalid prompt: ${moderationdata.data.results.flatMap(
                            r => Object.entries(r.categories).filter(([k, v]) => v).map(([k]) => k)
                        )}`,
                    });
                }

                const settings = {
                    temperature: 0.5,
                    max_tokens: 100,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                };
                const prompt = trimLines(`Extend the following paragraph: ${body.description}`);
                
                const completion = await openai.createCompletion({
                    ...settings,
                    model: modelToModel[body.model || 'davinci'] || modelToModel.ada,
                    prompt: prompt,
                  });
                console.log(completion.data);
                return reply.send(completion.data);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    console.log(error.message);
                }
                throw error;
            }
        }
    });

};

/*
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Write a creative ad for the following product to run on Facebook aimed at parents:\n\nProduct: Learning Room is a virtual environment to help students from kindergarten to high school excel in school.",
  temperature: 0.5,
  max_tokens: 100,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
});

const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Product description: A home milkshake maker\nSeed words: fast, healthy, compact.\nProduct names: HomeShaker, Fit Shaker, QuickShake, Shake Maker\n\nProduct description: A pair of shoes that can fit any foot size.\nSeed words: adaptable, fit, omni-fit.",
    temperature: 0.8,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Create an analogy for this phrase:\n\nQuestions are arrows in that:",
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  */